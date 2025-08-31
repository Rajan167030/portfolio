"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"

// Dynamically import the SkillOrb component
const SkillOrb = dynamic(() => import("@/components/skill-orb"), { ssr: false })

export default function ThreeJSSkillOrb() {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#9D00FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#12FCE8" />
      <Suspense fallback={null}>
        <SkillOrb />
      </Suspense>
    </Canvas>
  )
}
