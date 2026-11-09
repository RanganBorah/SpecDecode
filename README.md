# SpecDecode

**Real speculative decoding for LLMs running live on a laptop GPU.**

SpecDecode pairs a small, fast *draft* model with a larger *target* model and
shows, token by token, how the draft's guesses get verified in parallel by the
target. Nothing is simulated: inference runs locally through
[llama.cpp](https://github.com/ggml-org/llama.cpp), and every metric on screen
is measured from a real generation.

Built by **Rangan P Borah, Mayank Jain and Khushal Padshala** for
**DevJams'26**, GDG on Campus VIT Vellore's 48-hour hackathon.

## What is speculative decoding?

Standard LLM decoding is serial: one full forward pass of the big model per
generated token. Speculative decoding speeds this up without changing the
output:

1. The **draft model** quickly proposes several candidate tokens.
2. The **target model** verifies all of them in a **single batched forward pass**.
3. Correct guesses are accepted; at the first mismatch the target supplies the
   right token from the distribution it already computed.

The result is the same output distribution as the target model alone
(Leviathan et al. 2023, Chen et al. 2023), produced with fewer expensive
target-model calls.

## Features

- **Real local inference** with llama.cpp's `--model-draft` speculative decoding. Backend: Node/Express, streaming results over SSE.
- **Live token visualizer**: watch each token move from drafted to verified to accepted, rejected or corrected.
- **Real metrics**: acceptance rate, tokens/sec, target-model calls vs. standard decoding, latency.
- **Model registry**: drop any `.gguf` into `models/` and pick it from the target/draft dropdowns, no code changes.
- **CustomModel 5.1**: our own draft model, a QLoRA fine-tune of Llama-3.2-1B-Instruct trained locally in two rounds (10k examples from `tatsu-lab/alpaca`, then 15k from `yahma/alpaca-cleaned`). See [`training/`](training/README.md).
- **Benchmarks**: `npm run benchmarks` measures standard vs. speculative decoding on your own hardware.
- **Spider-Man themed UI**: React Three Fiber 3D landing page, comic-panel styling.

## Measured results (RTX 3050 Ti Laptop, 4GB VRAM)

Target Llama-3.2-3B-Instruct, draft Llama-3.2-1B-Instruct, both Q4_K_M:

| Metric | Standard | Speculative |
| --- | --- | --- |
| Target-model forward passes | 99 | 27 |
| Draft acceptance rate | n/a | 75.8% |
| Wall-clock speed | 48 tok/s | 22.7 tok/s (0.47x) |

Speculative decoding cuts target-model calls by about 73%, but on this
hardware it is **not faster in wall-clock time**. The 3B target is already
small and fast, and running two models on a 4GB GPU adds overhead. The
technique pays off when the target is the bottleneck (very large models on
datacenter GPUs). We report the numbers as measured.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Three Fiber / drei,
Node + Express, llama.cpp, PyTorch + PEFT + TRL (training).

## Quick start

Requirements: Node 20+, an NVIDIA GPU, and llama.cpp (CUDA build). Full steps,
including downloading the GGUF models, are in [SETUP.md](SETUP.md).

```bash
npm install
cp .env.example .env     # set LLAMA_SERVER_BIN
npm run dev:full         # frontend on :3000, backend on :8090
```

Other scripts: `npm run dev` (frontend only), `npm run server` (backend only),
`npm run benchmarks`, `npm run build`.

## Project structure

```
src/         React app (landing page, live demo, benchmarks, architecture)
server/      Express backend, llama-server manager, model registry
training/    QLoRA training, GGUF merge/export for CustomModel 5.1
scripts/     Benchmark runner and asset tooling
models/      Your .gguf files (not committed)
```

## References

- Leviathan, Kalman, Matias. *Fast Inference from Transformers via Speculative Decoding* (2023)
- Chen et al. *Accelerating Large Language Model Decoding with Speculative Sampling* (2023)
