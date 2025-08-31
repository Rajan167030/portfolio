"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function HeroScene() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1
      textRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group>
      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? "#9D00FF" : "#12FCE8"}
            emissive={Math.random() > 0.5 ? "#9D00FF" : "#12FCE8"}
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* 3D Text */}
      <mesh ref={textRef} position={[0, -1, 0]}>
        <Text3D font="/fonts/Inter_Bold.json" size={0.5} height={0.1} curveSegments={12}>
          PORTFOLIO
          <MeshDistortMaterial
            color="#12FCE8"
            emissive="#12FCE8"
            emissiveIntensity={0.8}
            roughness={0}
            metalness={1}
            distort={0.2}
            speed={2}
          />
        </Text3D>
      </mesh>
    </group>
  )
}
