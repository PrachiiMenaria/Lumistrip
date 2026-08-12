"use client";

import { MeshPhysicalMaterial } from "three";

export default function ServingTray() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Tray Base */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4, 0.2, 64]} />
        <meshPhysicalMaterial
          color="#e0e0e0"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Tray Rim */}
      <mesh receiveShadow position={[0, 0.15, 0]}>
        <torusGeometry args={[3.9, 0.1, 16, 64]} />
        <meshPhysicalMaterial
          color="#dcdcdc"
          metalness={1.0}
          roughness={0.05}
        />
      </mesh>

      {/* Glass Dome (Partially opened) */}
      <mesh position={[2, 1.5, -2]} rotation={[-0.2, 0.5, 0.3]} castShadow receiveShadow>
        <sphereGeometry args={[3.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transmission={0.95} // glass-like
          thickness={0.1}
          ior={1.5}
          transparent
          opacity={1}
          side={2} // DoubleSide = 2
        />
        {/* Dome Handle */}
        <mesh position={[0, 3.8, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial
            color="#e0e0e0"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </mesh>
    </group>
  );
}
