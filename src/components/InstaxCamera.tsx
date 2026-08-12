"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function InstaxCamera() {
  const cameraRef = useRef<THREE.Group>(null);

  // Subtle breathing animation
  useFrame((state) => {
    if (cameraRef.current) {
      cameraRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  const pinkColor = "#FFB6C1"; // Soft pink
  const silverColor = "#E0E0E0";
  const darkSilver = "#888888";
  const blackColor = "#1a1a1a";

  return (
    <group ref={cameraRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group position={[0, -0.5, 0]}>
          
          {/* Main Body (Wider, digital camera style) */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.4, 2.2, 1.2]} />
            <meshPhysicalMaterial
              color={pinkColor}
              roughness={0.2}
              metalness={0.4}
              clearcoat={0.5}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Front Grip (Right side from front view -> -X side) */}
          <mesh position={[-1.4, 0, 0.4]} castShadow>
            <boxGeometry args={[0.6, 2.0, 1.0]} />
            <meshPhysicalMaterial
              color={pinkColor}
              roughness={0.3}
              metalness={0.3}
            />
          </mesh>

          {/* --- LENS BARREL ASSEMBLY --- */}
          {/* Base Silver Ring */}
          <mesh position={[0, -0.1, 0.65]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[1.0, 1.0, 0.2, 64]} />
            <meshStandardMaterial color={silverColor} metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Black Barrel section */}
          <mesh position={[0, -0.1, 0.8]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.95, 0.95, 0.3, 64]} />
            <meshStandardMaterial color={blackColor} roughness={0.6} />
          </mesh>

          {/* Front Silver Ring */}
          <mesh position={[0, -0.1, 1.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.96, 0.96, 0.1, 64]} />
            <meshStandardMaterial color={silverColor} metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Inner Black Rim */}
          <mesh position={[0, -0.1, 1.06]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.75, 0.85, 0.05, 64]} />
            <meshStandardMaterial color={blackColor} roughness={0.8} />
          </mesh>

          {/* Lens Glass */}
          <mesh position={[0, -0.1, 1.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.02, 64]} />
            <meshPhysicalMaterial color="#ffffff" transmission={0.9} thickness={0.5} roughness={0.05} ior={1.5} transparent />
          </mesh>
          
          {/* Inner Lens Reflection/Sensor */}
          <mesh position={[0, -0.1, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
            <meshStandardMaterial color="#112233" emissive="#112233" emissiveIntensity={0.5} metalness={1} roughness={0} />
          </mesh>
          {/* ----------------------------- */}

          {/* --- TOP DIALS & BUTTONS --- */}
          {/* Shutter Button (Silver) */}
          <mesh position={[-1.2, 1.15, 0.2]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
            <meshStandardMaterial color={silverColor} metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Mode Dial (Silver) */}
          <mesh position={[-0.6, 1.15, -0.1]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
            <meshStandardMaterial color={darkSilver} metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Power Button (Small black) */}
          <mesh position={[-1.1, 1.12, -0.2]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
            <meshStandardMaterial color={blackColor} />
          </mesh>
          
          {/* Hot Shoe (Flash mount) */}
          <mesh position={[0, 1.15, 0]} castShadow>
            <boxGeometry args={[0.4, 0.1, 0.4]} />
            <meshStandardMaterial color={darkSilver} metalness={0.8} roughness={0.3} />
          </mesh>
          {/* ----------------------------- */}


          {/* Strap Loops (Left and Right) */}
          <mesh position={[1.75, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.1, 0.03, 16, 32, Math.PI]} />
            <meshStandardMaterial color={silverColor} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-1.75, 0.5, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <torusGeometry args={[0.1, 0.03, 16, 32, Math.PI]} />
            <meshStandardMaterial color={silverColor} metalness={0.9} roughness={0.2} />
          </mesh>

        </group>
      </Float>
    </group>
  );
}
