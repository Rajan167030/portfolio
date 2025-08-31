"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"

export default function RedesignedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Tech stack icons with colors and image paths
    const techStacks = [
      {
        name: "React",
        color: "#61DAFB",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        color: "#000000",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TypeScript",
        color: "#3178C6",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        color: "#F7DF1E",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Python",
        color: "#3776AB",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Node.js",
        color: "#339933",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "MongoDB",
        color: "#47A248",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "HTML5",
        color: "#E34F26",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        color: "#1572B6",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "Tailwind",
        color: "#38B2AC",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
      {
        name: "Three.js",
        color: "#000000",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      },
      {
        name: "AWS",
        color: "#FF9900",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      },
      {
        name: "Docker",
        color: "#2496ED",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Git",
        color: "#F05032",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Firebase",
        color: "#FFCA28",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Redux",
        color: "#764ABC",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      },
      {
        name: "GraphQL",
        color: "#E535AB",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      },
      {
        name: "Figma",
        color: "#F24E1E",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "VS Code",
        color: "#007ACC",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "GitHub",
        color: "#181717",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
    ]

    // Create particles
    const particles: Particle[] = []
    const iconSize = 40
    const iconImages: Record<string, HTMLImageElement> = {}
    const loadedImages: Record<string, boolean> = {}

    // Initialize mouse position to center of screen
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    const mouseRadius = 150

    // Preload images with proper error handling
    let loadedCount = 0
    const totalImages = techStacks.length

    techStacks.forEach((tech) => {
      const img = new Image()

      // Set up load and error handlers before setting src
      img.onload = () => {
        loadedImages[tech.name] = true
        loadedCount++

        // Check if all images are loaded
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }

      img.onerror = () => {
        console.warn(`Failed to load image for ${tech.name}`)
        loadedImages[tech.name] = false
        loadedCount++

        // Continue even if some images fail to load
        if (loadedCount === totalImages) {
          setImagesLoaded(true)
        }
      }

      // Set crossOrigin before src to avoid CORS issues
      img.crossOrigin = "anonymous"
      img.src = tech.image
      iconImages[tech.name] = img
    })

    // Create tech stack particles
    for (let i = 0; i < techStacks.length; i++) {
      const tech = techStacks[i]

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: iconSize,
        color: tech.color,
        name: tech.name,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        opacity: 0.9,
        hovered: false,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.02,
      })
    }

    // Add smaller connecting particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#9D00FF" : "#12FCE8",
        name: "",
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        rotation: 0,
        rotationSpeed: 0,
        opacity: 0.5,
        hovered: false,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.05 + Math.random() * 0.03,
      })
    }

    // Helper function to draw fallback icon
    function drawFallbackIcon(ctx: CanvasRenderingContext2D, p: Particle, pulseFactor: number) {
      const size = p.size * (p.hovered ? 1.2 : 1) * pulseFactor

      // Draw colored circle as fallback
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()

      // Add tech initial in the center
      if (p.name) {
        ctx.font = "bold 16px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(p.name.charAt(0), 0, 0)
      }

      // Draw name below icon when hovered
      if (p.hovered && p.name) {
        ctx.shadowBlur = 5
        ctx.font = "bold 14px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(p.name, 0, size / 2 + 5)
      }
    }

    // Handle mouse interaction - safely handle the event
    function handleMouseMove(event: MouseEvent) {
      if (event) {
        mouseX = event.clientX
        mouseY = event.clientY
      }
    }

    // Safely add event listener
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove)
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear canvas with a slight fade effect for trails
      ctx.fillStyle = "rgba(10, 0, 20, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections first (behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Only draw connections from tech stack particles
        if (!p1.name) continue

        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue

          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw connection if particles are close enough
          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)

            // Gradient connections
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, p1.name ? `${p1.color}40` : "rgba(157, 0, 255, 0.1)")
            gradient.addColorStop(1, p2.name ? `${p2.color}40` : "rgba(18, 252, 232, 0.1)")

            ctx.strokeStyle = gradient
            ctx.globalAlpha = Math.max(0, 1 - distance / 200) * 0.5
            ctx.lineWidth = p1.hovered || p2.hovered ? 2 : 0.5
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update pulse phase
        p.pulsePhase += p.pulseSpeed
        if (p.pulsePhase > Math.PI * 2) p.pulsePhase -= Math.PI * 2

        // Pulse effect
        const pulseFactor = 0.1 * Math.sin(p.pulsePhase) + 1

        // Mouse interaction
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          // Repel particles from mouse
          const force = (mouseRadius - distance) / mouseRadius
          p.speedX -= dx * force * 0.01
          p.speedY -= dy * force * 0.01

          // Highlight tech stack when hovered
          if (p.name) {
            p.hovered = true
          }
        } else {
          p.hovered = false
        }

        // Update position
        p.x += p.speedX
        p.y += p.speedY
        p.rotation += p.rotationSpeed

        // Bounce off edges with some padding
        const padding = p.name ? p.size : 0
        if (p.x < padding) {
          p.x = padding
          p.speedX *= -1
        } else if (p.x > canvas.width - padding) {
          p.x = canvas.width - padding
          p.speedX *= -1
        }

        if (p.y < padding) {
          p.y = padding
          p.speedY *= -1
        } else if (p.y > canvas.height - padding) {
          p.y = canvas.height - padding
          p.speedY *= -1
        }

        // Apply friction
        p.speedX *= 0.99
        p.speedY *= 0.99

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)

        if (p.name) {
          // Draw tech stack icon if image is loaded successfully
          if (loadedImages[p.name]) {
            const img = iconImages[p.name]
            if (img && img.complete && img.naturalWidth !== 0) {
              const size = p.size * (p.hovered ? 1.2 : 1) * pulseFactor

              // Draw glow effect when hovered
              if (p.hovered) {
                ctx.shadowColor = p.color
                ctx.shadowBlur = 15
              }

              try {
                // Draw icon with error handling
                ctx.drawImage(img, -size / 2, -size / 2, size, size)
              } catch (error) {
                // Fallback to colored circle if image drawing fails
                drawFallbackIcon(ctx, p, pulseFactor)
              }

              // Draw name below icon when hovered
              if (p.hovered) {
                ctx.shadowBlur = 5
                ctx.font = "bold 14px Arial"
                ctx.textAlign = "center"
                ctx.textBaseline = "top"
                ctx.fillStyle = "#FFFFFF"
                ctx.fillText(p.name, 0, size / 2 + 5)
              }
            } else {
              // Fallback for incomplete images
              drawFallbackIcon(ctx, p, pulseFactor)
            }
          } else {
            // Fallback for images that failed to load
            drawFallbackIcon(ctx, p, pulseFactor)
          }
        } else {
          // Draw small connecting particles
          ctx.beginPath()
          const particleSize = p.size * pulseFactor
          ctx.arc(0, 0, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }

        ctx.restore()
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    const animationId = requestAnimationFrame(animate)

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
      }
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Safe click handlers that don't rely on event destructuring
  const handleResumeClick = () => {
    window.open("/resume.pdf", "_blank")
  }

  const handleGithubClick = () => {
    window.open("https://github.com/ken-rolex", "_blank")
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-purple-800/10 to-transparent"></div>

      {/* Interactive canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Main content */}
      <motion.div
        className="relative z-10 w-full text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-6">
          <Badge className="mb-4 bg-purple-600/30 text-purple-300 border border-purple-500/50 px-4 py-1 text-sm">
            Full Stack Developer
          </Badge>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TypewriterEffect
            words={[
              { text: "Hi, I'm", className: "text-purple-400" },
              { text: "Rajan Jha", className: "text-purple-400" },
              { text: "Full Stack Developer", className: "text-purple-400" },
            ]}
            cursorClassName="bg-purple-400"
          />
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I create immersive digital experiences with cutting-edge technologies. Specializing in modern technology with
          a focus on performance and user experience.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
            onClick={handleResumeClick}
          >
            Resume
          </Button>

          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 backdrop-blur-sm"
            onClick={handleGithubClick}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub Profile
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  name: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
  hovered: boolean
  pulsePhase: number
  pulseSpeed: number
}
