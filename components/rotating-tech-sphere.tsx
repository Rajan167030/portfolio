"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface TechIcon {
  name: string
  icon: string
}

export default function RotatingTechSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Define all the tech icons
  const techIcons: TechIcon[] = [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    },
    {
      name: "Google Cloud",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    },
    { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png" },
    { name: "Netlify", icon: "https://www.netlify.com/v3/img/components/logomark.png" },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  ]

  useEffect(() => {
    // Set loaded state after a small delay to ensure smooth animation start
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[600px] overflow-hidden" ref={containerRef}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Center sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-500/30 backdrop-blur-sm border border-purple-500/20"></div>

      {/* Orbiting tech icons */}
      {techIcons.map((tech, index) => {
        // Calculate positions on different orbits
        const totalIcons = techIcons.length
        const orbit = Math.floor(index / 8) + 1
        const iconsInOrbit = Math.min(8, totalIcons - (orbit - 1) * 8)
        const angleStep = (2 * Math.PI) / iconsInOrbit
        const angleOffset = (index % iconsInOrbit) * angleStep
        const orbitRadius = 100 + orbit * 70
        const orbitSpeed = 20 + orbit * 5 // seconds for a full rotation
        const orbitDirection = orbit % 2 === 0 ? 1 : -1 // alternate direction

        return (
          <motion.div
            key={tech.name}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    x: `calc(${Math.cos(angleOffset) * orbitRadius}px - 50%)`,
                    y: `calc(${Math.sin(angleOffset) * orbitRadius}px - 50%)`,
                  }
                : {}
            }
            transition={{ duration: 1, delay: index * 0.05 }}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
          >
            {/* Orbit animation */}
            <motion.div
              className="relative"
              animate={{
                rotate: orbitDirection * 360,
              }}
              transition={{
                duration: orbitSpeed,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                transformOrigin: `${-Math.cos(angleOffset) * orbitRadius}px ${-Math.sin(angleOffset) * orbitRadius}px`,
              }}
            >
              {/* Tech icon */}
              <motion.div
                className="w-12 h-12 rounded-full bg-purple-900/80 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.2 }}
                animate={{ rotate: orbitDirection * -360 }} // Counter-rotate to keep icon upright
                transition={{ duration: orbitSpeed, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={tech.icon || "/placeholder.svg"}
                    alt={tech.name}
                    fill
                    className="object-contain"
                    style={{ filter: "drop-shadow(0px 0px 5px rgba(157, 0, 255, 0.5))" }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Tech name tooltip */}
            {hoveredTech === tech.name && (
              <motion.div
                className="absolute top-16 left-1/2 -translate-x-1/2 bg-purple-900/80 backdrop-blur-sm border border-purple-500/30 px-3 py-1 rounded-md whitespace-nowrap z-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-white">{tech.name}</span>
              </motion.div>
            )}
          </motion.div>
        )
      })}

      {/* Connecting lines effect */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-20">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9D00FF" />
            <stop offset="100%" stopColor="#12FCE8" />
          </linearGradient>
        </defs>
        {techIcons.slice(0, 12).map((_, i) => {
          const nextIndex = (i + 1) % 12
          const startAngle = (i / 12) * 2 * Math.PI
          const endAngle = (nextIndex / 12) * 2 * Math.PI
          const radius = 170
          const startX = Math.cos(startAngle) * radius + 300
          const startY = Math.sin(startAngle) * radius + 300
          const endX = Math.cos(endAngle) * radius + 300
          const endY = Math.sin(endAngle) * radius + 300

          return (
            <motion.line
              key={`line-${i}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          )
        })}
      </svg>

      {/* Central label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Tech Stack
          </h3>
        </motion.div>
      </div>
    </div>
  )
}
