import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowRight, Instagram, Linkedin, Github } from 'lucide-react';
import { TitleScene3D } from '../components/TitleScene3D';
import { SocialIcon3D } from '../components/SocialIcon3D';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/r4ngann_/?hl=en', label: 'Instagram', color: '#e1306c', icon: <Instagram className="w-5 h-5" /> },
  { href: 'https://www.linkedin.com/in/rangan-pratik-borah-69957b375/', label: 'LinkedIn', color: '#0a66c2', icon: <Linkedin className="w-5 h-5" /> },
  { href: 'https://github.com/RanganBorah', label: 'GitHub', color: '#e5e7eb', icon: <Github className="w-5 h-5" /> },
];

interface LandingProps {
  onEnter: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browsers block autoplay with sound until the page has user engagement,
    // so try unmuted first and fall back to muted + unmute-on-first-interaction.
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});

      const unmuteOnInteraction = () => {
        video.muted = false;
        setIsMuted(false);
        video.play().catch(() => {});
      };
      document.addEventListener('click', unmuteOnInteraction, { once: true });
      document.addEventListener('keydown', unmuteOnInteraction, { once: true });
      return () => {
        document.removeEventListener('click', unmuteOnInteraction);
        document.removeEventListener('keydown', unmuteOnInteraction);
      };
    });
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      video.play().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/landing-bg.mp4"
        autoPlay
        loop
        playsInline
      />

      {/* Web pattern + gradient overlays for legibility and theme */}
      <div className="absolute inset-0 bg-web-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-blue-950/30 pointer-events-none" />

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className="absolute top-5 right-5 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm text-xs font-medium text-white hover:bg-black/70 transition-colors cursor-pointer"
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        <span>{isMuted ? 'Unmute' : 'Mute'}</span>
      </button>

      {/* GDG logo — small, tucked in the top-left corner */}
      <img
        src="/logos/gdg-logo.png"
        alt="GDG on Campus VIT Vellore"
        className="absolute top-5 left-5 z-20 h-8 sm:h-10 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      {/* Social handles — vertical rail, one side of the page */}
      <div className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1">
        {SOCIAL_LINKS.map((social) => (
          <SocialIcon3D key={social.label} {...social} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-6 py-24">
        <span className="inline-block text-[11px] sm:text-xs tracking-widest uppercase text-red-400 font-semibold border border-red-800/60 bg-red-950/40 rounded-full px-4 py-1.5">
          GDG on Campus VIT Vellore &bull; DevJams&rsquo;26
        </span>

        <TitleScene3D />

        {/* DevJams logo — small, centered under the project name */}
        <img
          src="/logos/devjams-logo.png"
          alt="DevJams'26"
          className="mx-auto h-10 sm:h-12 w-auto object-contain -mt-4"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        <p className="text-sm sm:text-base text-slate-300">
          Made by{' '}
          <span className="text-white font-semibold">Rangan P Borah</span>,{' '}
          <span className="text-white font-semibold">Mayank Jain</span>, and{' '}
          <span className="text-white font-semibold">Khushal Padshala</span>
        </p>

        <div className="pt-4 space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed">
          <p>
            DevJams&rsquo;26 is GDG on Campus VIT Vellore&rsquo;s flagship 48-hour hackathon, and SpecDecode
            is what came out of it: real GPU-accelerated speculative decoding, built from scratch, no
            simulations.
          </p>
          <p className="text-slate-400 italic">
            And the board &amp; core team pulling this whole universe together? Just as cool as Spider-Man
            himself — mentoring, hyping, and swinging in exactly when you need them most.
          </p>
        </div>

        <div className="pt-6">
          <button
            onClick={onEnter}
            className="comic-panel inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer"
          >
            <span>Enter SpecDecode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
