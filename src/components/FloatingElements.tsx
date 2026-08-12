"use client";

import { Float } from "@react-three/drei";
import * as THREE from "three";

// Colors from original palette:
// Cream: #FFEED6, Olive: #A5AF79, Moss: #827148, Peach: #E8A07C, Terracotta: #B77466, Wine: #9A3F3F

function Polaroid({ position, rotation }: any) {
  // 7s loop -> speed = ~0.85
  return (
    <Float speed={0.85} rotationIntensity={0.8} floatIntensity={1} position={position} rotation={rotation}>
      <group castShadow receiveShadow>
        <mesh position={[0, 0, 0]} castShadow>
          <planeGeometry args={[1.5, 1.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.15, 0.01]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshStandardMaterial color="#2d2a26" roughness={0.5} />
        </mesh>
        {/* Red Tape piece on polaroid */}
        <mesh position={[0.5, 0.8, 0.02]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshStandardMaterial color="#B77466" roughness={0.8} opacity={0.8} transparent />
        </mesh>
      </group>
    </Float>
  );
}

function TapePiece({ position, rotation, color = "#E8A07C" }: any) {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.9} opacity={0.8} transparent side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function KissSticker({ position, rotation }: any) {
  // Stars / stickers 5s loop -> speed = 1.2
  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={0.8} position={position} rotation={rotation}>
      <mesh castShadow>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#9A3F3F" roughness={0.3} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function TinyFolder({ position, rotation }: any) {
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1} position={position} rotation={rotation}>
      <group>
        {/* Back of folder */}
        <mesh position={[0, 0, 0]} castShadow>
          <planeGeometry args={[1.2, 0.9]} />
          <meshStandardMaterial color="#A5AF79" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        {/* Front flap of folder */}
        <mesh position={[0, -0.1, 0.02]} rotation={[-0.1, 0, 0]} castShadow>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color="#827148" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function Flower({ position, rotation }: any) {
  // Flowers 8s loop -> speed = 0.75
  return (
    <Float speed={0.75} rotationIntensity={2} floatIntensity={1.5} position={position} rotation={rotation}>
      <group>
        {/* Simple daisy representation */}
        <mesh position={[0, 0, 0]}>
          <circleGeometry args={[0.15, 32]} />
          <meshStandardMaterial color="#FCCC73" roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 3) * 0.25, Math.sin(i * Math.PI / 3) * 0.25, -0.01]} rotation={[0, 0, i * Math.PI / 3]}>
            <planeGeometry args={[0.3, 0.15]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FilmStrip({ position, rotation }: any) {
  // Film strip 9s loop -> speed = ~0.66
  return (
    <Float speed={0.66} rotationIntensity={0.6} floatIntensity={1.2} position={position} rotation={rotation}>
      <group castShadow>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.6, 2.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Film holes */}
        {[...Array(8)].map((_, i) => (
          <mesh key={`l-${i}`} position={[-0.25, -1.05 + i * 0.3, 0.01]}>
            <planeGeometry args={[0.05, 0.1]} />
            <meshBasicMaterial color="#FFEED6" />
          </mesh>
        ))}
        {[...Array(8)].map((_, i) => (
          <mesh key={`r-${i}`} position={[0.25, -1.05 + i * 0.3, 0.01]}>
            <planeGeometry args={[0.05, 0.1]} />
            <meshBasicMaterial color="#FFEED6" />
          </mesh>
        ))}
        {/* Film frames */}
        {[...Array(3)].map((_, i) => (
          <mesh key={`f-${i}`} position={[0, -0.75 + i * 0.75, 0.01]}>
            <planeGeometry args={[0.4, 0.6]} />
            <meshStandardMaterial color="#333" roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Heart({ position, rotation }: any) {
  // Hearts 10s loop -> speed = 0.6
  return (
    <Float speed={0.6} rotationIntensity={1.5} floatIntensity={1.2} position={position} rotation={rotation}>
      <group castShadow scale={0.5}>
        <mesh position={[-0.25, 0.25, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#FFD9C2" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0.25, 0.25, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#FFD9C2" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.7, 0.7, 0.4]} />
          <meshStandardMaterial color="#FFD9C2" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function CoffeeReceipt({ position, rotation }: any) {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.5} position={position} rotation={rotation}>
      <group castShadow>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.8, 2.2]} />
          <meshStandardMaterial color="#FFF8F2" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
        {/* Receipt lines */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0.8 - i * 0.2, 0.01]}>
            <planeGeometry args={[0.6, 0.05]} />
            <meshBasicMaterial color="#49344F" opacity={0.3} transparent />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function FloatingElements() {
  return (
    <group>
      <Polaroid position={[-3, 1, 1]} rotation={[0, 0.2, -0.2]} />
      <Polaroid position={[3.5, 0.5, 0.5]} rotation={[0, -0.4, 0.3]} />
      
      <TapePiece position={[-1.5, 3, -1]} rotation={[0.5, 0.5, -0.3]} color="#E8A07C" />
      <TapePiece position={[2.5, 2.8, 1.5]} rotation={[0.1, 0.8, 0.5]} color="#A5AF79" />
      
      <KissSticker position={[1, 3.5, 0.5]} rotation={[0.2, 0.1, 0.5]} />
      
      <TinyFolder position={[-2, -1, 2.5]} rotation={[-0.2, 0.1, -0.1]} />
      
      <Flower position={[2.8, -0.8, 2.2]} rotation={[0.1, -0.2, 0.15]} />
      <Flower position={[-3.5, -0.2, 0.5]} rotation={[0.4, 0.1, -0.4]} />

      <FilmStrip position={[-4, 2, -2]} rotation={[0, 0.3, 0.1]} />
      <FilmStrip position={[4, -1, -1]} rotation={[0, -0.5, -0.2]} />

      <Heart position={[3, 4, 0]} rotation={[-0.2, 0.4, 0.3]} />
      <Heart position={[-2, -3, 1]} rotation={[0.4, -0.1, -0.2]} />
      
      <CoffeeReceipt position={[4.5, 2, -3]} rotation={[0.1, -0.6, -0.1]} />
    </group>
  );
}
