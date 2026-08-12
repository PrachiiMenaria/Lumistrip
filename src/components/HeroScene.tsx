"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

import InstaxCamera from "./InstaxCamera";
import FloatingElements from "./FloatingElements";

function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    // Subtle parallax effect based on mouse movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 2 + 2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function LensSweep() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      // 8s sweep loop
      const t = state.clock.elapsedTime;
      lightRef.current.position.x = Math.sin(t * (Math.PI / 4)) * 15;
      lightRef.current.position.z = Math.cos(t * (Math.PI / 4)) * 15;
      lightRef.current.lookAt(0, 0, 0);
    }
  });
  return <directionalLight ref={lightRef} position={[-15, 5, 10]} intensity={3} color="#ffffff" />;
}

export default function HeroScene() {
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-0 bg-transparent pointer-events-none">
      <Canvas shadows camera={{ position: [0, 2, 14], fov: 45 }} className="pointer-events-auto">
        {/* <SoftShadows size={10} samples={8} focus={0.5} /> */}
        
        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.6} color="#FFF8F2" />
        {/* Soft sunlight from upper left */}
        <spotLight 
          position={[-15, 20, 10]} 
          angle={0.4} 
          penumbra={1} 
          intensity={2.5} 
          castShadow 
          shadow-mapSize={2048} 
          color="#FFF4C8"
        />
        {/* Fill light */}
        <spotLight 
          position={[10, -10, -10]} 
          angle={0.5} 
          penumbra={1} 
          intensity={1} 
          color="#DCCEFF" 
        />
        
        {/* Sweeping Reflection Light */}
        <LensSweep />
        
        {/* Premium HDRI Environment removed to fix fetch issues; relying on SpotLights */}

        <PresentationControls 
          global 
          zoom={0.9} 
          rotation={[0, -Math.PI / 5, 0]} 
          polar={[-Math.PI / 6, Math.PI / 6]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <group position={[0, -0.5, 0]}>
            <InstaxCamera />
            <FloatingElements />
            
            {/* Soft contact shadow on the floor */}
            <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={20} blur={3} far={5} color="#49344F" />
          </group>
        </PresentationControls>

        <Rig />
      </Canvas>
    </div>
  );
}
