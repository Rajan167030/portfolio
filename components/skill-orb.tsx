"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Cloud } from "@react-three/drei"
import type * as THREE from "three"

export default function SkillOrb() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Node.js",
    "Tailwind",
    "MongoDB",
    "GraphQL",
    "Framer Motion",
    "Firebase",
  ]

  return (
    <group ref={groupRef}>
      <Cloud count={10} radius={4} speed={0.4} depth={1.5} opacity={0.2} />

      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 2

        return (
          <Text key={skill} position={[x, y, z]} fontSize={0.3} color="#9D00FF" anchorX="center" anchorY="middle">
            {skill}
          </Text>
        )
      })}

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#12FCE8"
          emissive="#12FCE8"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  )
}
