"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Globe, Smartphone, Bot, Brush, Database, LayoutDashboard, TrendingUp, ShoppingCart, Cloud } from "lucide-react"
import ServiceCard from "@/components/service-card"

export default function ServicesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simple floating particles (no lightning)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const points: Point[] = []
    const pointCount = 20

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.2 + 0.1,
        color: "#9D00FF",
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      points.forEach((point) => {
        point.x += point.speedX
        point.y += point.speedY

        if (point.x < 0 || point.x > canvas.width) point.speedX *= -1
        if (point.y < 0 || point.y > canvas.height) point.speedY *= -1

        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${point.color}${Math.floor(point.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const services = [
    {
      icon: <LayoutDashboard className="text-fuchsia-300" />,
      title: "UI/UX Design",
      subtitle: "User-First Interfaces",
      description:
        "From user research and wireframes to interactive prototypes and design systems. Accessible, consistent, and conversion-focused experiences.",
      category: "ui-ux",
      shape: "rounded-2xl",
      gradient: "from-fuchsia-600 via-purple-500 to-violet-500",
      borderGradient: "from-fuchsia-400 to-violet-400",
    },
    {
      icon: <Globe className="text-blue-300" />,
      title: "Web Development",
      subtitle: "Full-Stack Solutions",
      description:
        "Modern, responsive websites and web apps powered by React and Next.js with robust APIs for performance and scalability.",
      category: "web-development",
      shape: "rounded-2xl",
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      borderGradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: <Smartphone className="text-indigo-300" />,
      title: "Mobile Apps",
      subtitle: "Cross-Platform",
      description:
        "Beautiful, high‑performance mobile apps for iOS and Android using React Native with a single shared codebase.",
      category: "mobile-apps",
      shape: "rounded-2xl",
      gradient: "from-indigo-600 via-indigo-500 to-blue-500",
      borderGradient: "from-indigo-400 to-blue-400",
    },
    {
      icon: <Bot className="text-green-300" />,
      title: "Gen AI Apps",
      subtitle: "AI-Powered Solutions",
      description:
        "Chatbots, content generation, and intelligent automation using leading LLMs integrated into your product.",
      category: "ai-apps",
      shape: "rounded-2xl",
      gradient: "from-green-600 via-green-500 to-emerald-500",
      borderGradient: "from-green-400 to-emerald-400",
    },
    {
      icon: <Database className="text-teal-300" />,
      title: "Backend Development",
      subtitle: "Server Solutions",
      description: "Secure APIs, real-time features, and reliable databases using Node.js and cloud-native patterns.",
      category: "backend-development",
      shape: "rounded-2xl",
      gradient: "from-teal-600 via-teal-500 to-cyan-500",
      borderGradient: "from-teal-400 to-cyan-400",
    },
    {
      icon: <Brush className="text-orange-300" />,
      title: "Graphics Design",
      subtitle: "Visual Identity",
      description: "Logos, brand kits, social creatives, and marketing visuals that make your brand memorable.",
      category: "graphics-design",
      shape: "rounded-2xl",
      gradient: "from-orange-600 via-orange-500 to-amber-500",
      borderGradient: "from-orange-400 to-amber-400",
    },
    {
      icon: <TrendingUp className="text-emerald-300" />,
      title: "SEO & Performance",
      subtitle: "Faster, Findable, Friendly",
      description:
        "Core Web Vitals improvements, technical SEO, structured data, and content strategy to rank and convert.",
      category: "seo-performance",
      shape: "rounded-2xl",
      gradient: "from-emerald-600 via-lime-500 to-green-500",
      borderGradient: "from-emerald-400 to-lime-400",
    },
    {
      icon: <ShoppingCart className="text-rose-300" />,
      title: "E‑commerce Solutions",
      subtitle: "Storefronts That Scale",
      description: "Checkout flows, product catalogs, and integrations built for speed and trust to boost sales.",
      category: "ecommerce",
      shape: "rounded-2xl",
      gradient: "from-rose-600 via-pink-500 to-orange-500",
      borderGradient: "from-rose-400 to-orange-400",
    },
    {
      icon: <Cloud className="text-sky-300" />,
      title: "DevOps & Cloud",
      subtitle: "Deploy, Observe, Optimize",
      description: "CI/CD pipelines, monitoring, and cost‑efficient infrastructure on modern cloud platforms.",
      category: "devops-cloud",
      shape: "rounded-2xl",
      gradient: "from-sky-600 via-cyan-500 to-blue-500",
      borderGradient: "from-sky-400 to-cyan-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            My Services
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transforming ideas into digital reality with innovative solutions and creative excellence
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.category}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  },
                },
              }}
              className="flex justify-center"
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                category={service.category}
                shape={service.shape}
                gradient={service.gradient}
                borderGradient={service.borderGradient}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle background elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-purple-600/5 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/5 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

interface Point {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}
