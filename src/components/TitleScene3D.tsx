import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

const TitleMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    target.current.x = pointer.y * 0.14;
    target.current.y = pointer.x * 0.22;
    const group = groupRef.current;
    if (group) {
      group.rotation.x += (target.current.x - group.rotation.x) * 0.05;
      group.rotation.y += (target.current.y - group.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.08} floatIntensity={0.3}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.1}
            height={0.32}
            curveSegments={16}
            bevelEnabled
            bevelThickness={0.045}
            bevelSize={0.032}
            bevelSegments={6}
          >
            SpecDecode
            <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.25} />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
};

export const TitleScene3D: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-80 lg:h-[26rem] cursor-default overflow-visible">
      <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[-4, 2, 4]} intensity={45} color="#ef4444" />
        <pointLight position={[4, -2, 4]} intensity={45} color="#3b82f6" />
        <directionalLight position={[0, 4, 6]} intensity={0.9} color="#ffffff" />
        <Suspense fallback={null}>
          <TitleMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};
