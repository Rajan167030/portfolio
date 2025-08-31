"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import type * as THREE from "three"

export default function SkillSpheres() {
  const skills = [
    { name: "React", color: "#61DAFB", size: 1.2 },
    { name: "Next.js", color: "#FFFFFF", size: 1.3 },
    { name: "TypeScript", color: "#3178C6", size: 1.2 },
    { name: "JavaScript", color: "#F7DF1E", size: 1.1 },
    { name: "Three.js", color: "#FFFFFF", size: 1 },
    { name: "Node.js", color: "#339933", size: 1.1 },
    { name: "Tailwind", color: "#38B2AC", size: 1 },
    { name: "MongoDB", color: "#47A248", size: 0.9 },
    { name: "GraphQL", color: "#E535AB", size: 0.9 },
    { name: "Framer Motion", color: "#0055FF", size: 0.8 },
    { name: "Firebase", color: "#FFCA28", size: 0.9 },
    { name: "Git", color: "#F05032", size: 0.8 },
    { name: "CSS", color: "#1572B6", size: 0.9 },
    { name: "HTML", color: "#E34F26", size: 0.9 },
    { name: "Redux", color: "#764ABC", size: 0.8 },
  ]

  return (
    <group>
      {skills.map((skill, i) => (
        <SkillSphere key={skill.name} skill={skill} index={i} totalSkills={skills.length} />
      ))}
    </group>
  )
}

interface SkillSphereProps {
  skill: {
    name: string
    color: string
    size: number
  }
  index: number
  totalSkills: number
}

function SkillSphere({ skill, index, totalSkills }: SkillSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Calculate position in a 3D spiral
  const angle = (index / totalSkills) * Math.PI * 8
  const radius = 6
  const verticalSpread = 4
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  const y = (index / totalSkills) * verticalSpread - verticalSpread / 2

  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle floating animation
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5 + index) * 0.002
    }
  })

  return (
    <motion.mesh
      ref={meshRef}
      position={[x, y, z]}
      scale={clicked ? 1.5 : hovered ? 1.2 : skill.size}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.2 : skill.size,
        rotateY: clicked ? Math.PI * 2 : 0,
      }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 0.8 : 0.4}
        roughness={0.2}
        metalness={0.8}
      />

      {/* Skill name label */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={10}
        occlude
        className={`pointer-events-none transition-opacity duration-300 ${
          hovered || clicked ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="px-2 py-1 rounded-md bg-purple-900/80 text-white text-xs whitespace-nowrap backdrop-blur-sm border border-purple-500/30">
          {skill.name}
        </div>
      </Html>
    </motion.mesh>
  )
}
