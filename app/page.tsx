"use client"

import type { ReactNode } from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Mail, Linkedin, Twitter, Smartphone, Globe, Bot } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import { GlowingButton } from "@/components/ui/glowing-button"
import { GlassMorphCard } from "@/components/ui/glass_morph_card"
import { useToast } from "@/hooks/use-toast"
import ExperienceTimeline from "@/components/experience-timeline"
import RedesignedHero from "@/components/redesigned-hero"
import EnhancedHorizontalTicker from "@/components/enhanced-horizontal-ticker"
import ServiceCard from "@/components/service-card"
import AboutSection from "@/components/about-section"
import Navbar from "@/components/navbar"
import WhatsAppChatButton from "@/components/whatsapp-chat-button"

// We'll load the Three.js components only after the component has mounted
const ThreeJSComponents = () => {
  const [ThreeJSSkillSpheres, setThreeJSSkillSpheres] = useState<ReactNode | null>(null)

  useEffect(() => {
    // Dynamically import the Three.js components only on the client side
    const loadComponents = async () => {
      try {
        const skillSpheresModule = await import("@/components/three-js-skill-spheres")
        setThreeJSSkillSpheres(() => skillSpheresModule.default)
      } catch (error) {
        console.error("Failed to load Three.js components:", error)
      }
    }

    loadComponents()
  }, [])

  return { ThreeJSSkillSpheres }
}

export default function Home() {
  const { toast } = useToast()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, [0, 1], [0, -100])

  const [mounted, setMounted] = useState(false)
  const { ThreeJSSkillSpheres } = ThreeJSComponents()

  useEffect(() => {
    // Set mounted state to true after component mounts on client
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const experiences = [
    {
      title: "Co-Founder",
      company: "Event Info",
      period: "2023 - Present",
      description:
        "Co-founded and led the development of a comprehensive event management platform. Responsible for technical architecture, product strategy, team leadership, and business development. Built scalable solutions for event organizers and attendees while managing cross-functional teams and driving company growth.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Next.js",
        "TypeScript",
        "Docker",
        "AWS",
        "Leadership",
        "Product Strategy",
        "Business Development",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Synova Tech - IT Services & Consulting Firm",
      period: "2022 - 2023",
      description:
        "Developed and maintained enterprise-level web applications using MERN stack for various clients in the IT consulting domain. Implemented containerized solutions with Docker and managed deployments using Kubernetes. Collaborated with cross-functional teams to deliver scalable, high-performance applications while ensuring code quality and best practices.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "Docker",
        "Kubernetes",
        "JavaScript",
        "TypeScript",
        "Git",
        "AWS",
      ],
    },
    {
      title: "Freelancer",
      company: "Multiple Platforms (Upwork, Fiverr, Freelancer)",
      period: "2021 - Present",
      description:
        "Delivered 50+ successful web development and AI integration projects for clients worldwide. Specialized in full-stack web development, generative AI solutions, chatbot development, and custom automation tools. Maintained 5-star ratings across all platforms with expertise in modern web technologies and cutting-edge AI implementations including LangChain, OpenAI APIs, and machine learning models.",
      technologies: [
        "React",
        "Next.js",
        "Python",
        "Django",
        "MongoDB",
        "PostgreSQL",
        "OpenAI",
        "LangChain",
        "TensorFlow",
        "Generative AI",
        "Chatbots",
        "Machine Learning",
      ],
    },
  ]

  const projects = [
    {
      title: "Tech & Talk",
      description: "A comprehensive website for my YouTube channel with content management and analytics",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tech%20and%20talk%20web%20site-sHOY5IfR7rHLDF4u0Q0sPoW4w70Akc.png",
      tags: ["TypeScript", "Node.js", "Three.js", "Supabase", "Next.js"],
      status: ["Completed", "Profitable"],
      github: "https://github.com/ken-rolex/tech-and-talk",
      demo: "",
    },
    {
      title: "DodgeCoin Website",
      description: "Modern cryptocurrency landing page with real-time price tracking and wallet integration",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dodge%20coin%20web%20site-gGt4Jmr37FokBKnyjXW2T4i5GaaHUN.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: ["Completed", "Fun"],
      github: "https://github.com/ken-rolex",
      demo: "https://example.com",
    },
    {
      title: "Synova Web3 Browser",
      description: "Revolutionary Web3 browser with built-in wallet, DeFi integration, and NFT marketplace",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/synova%20web%203%20%20browser-Ngl3Zxtt7GPA0THma5s1WEfeACghV9.png",
      tags: ["React", "Three.js", "Blockchain", "Web3"],
      status: ["Progress", "Funding"],
      github: "https://github.com/ken-rolex",
      demo: "https://example.com",
    },
    {
      title: "GitHub Battle",
      description: "Compare GitHub profiles and see who comes out on top based on stars, followers, and more!",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-26%20115723-OAyaOKULQIRboKUQBkzWbUmBBLWhqv.png",
      tags: ["React", "GitHub API", "JavaScript", "CSS"],
      status: ["Completed", "Fun"],
      github: "https://github.com/ken-rolex",
      demo: "https://example.com",
    },
    {
      title: "Lumina.ai",
      description:
        "Advanced AI chatbot assistant powered by AI SDK, featuring intelligent conversations, context awareness, and seamless integration with modern web technologies.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-16%20173831-J0bzFKIUT4CspxIoH0oWpDkrp6x3Me.png",
      tags: ["AI SDK", "Vercel", "TypeScript", "Next.js", "OpenAI"],
      status: ["Completed", "Profitable"],
      github: "https://github.com/ken-rolex",
      demo: "https://example.com",
    },
    {
      title: "15forteen Study Platform",
      description:
        "Comprehensive educational platform offering well-structured study notes for computer science subjects. Features advanced search, filtering, ratings system, and download tracking for academic resources.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-26%20133141-6kzTOco1yIkN8pYgQUAOSkgNGPfUJC.png",
      tags: ["React", "Node.js", "MongoDB", "Express", "Education"],
      status: ["Completed", "Collaboration"],
      github: "https://github.com/ken-rolex",
      demo: "https://example.com",
    },
    {
      title: "Lirycam",
      description:
        "Revolutionary AI-powered creative platform that transforms your photos into beautiful poems and songs. Upload any image and watch as advanced AI algorithms analyze visual elements to generate inspiring poetry and melodic compositions.",
      image: "/images/lirycam-photoverse.png",
      tags: ["AI SDK", "Computer Vision", "NLP", "React", "OpenAI"],
      status: ["Completed", "Fun"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Birthday-bell-app",
      description: "Birthday Bell is a vibrant web application designed to help users remember and celebrate birthdays with ease. Built with a modern and user-friendly interface, this app ensures you never miss a special day again!",

      image: "/images/birthday-bell-app.png",
      tags: ["Javascript", "Python", "CSS", "HTML"],
      status: ["Profitable", "Progress"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Culinary.ai",
      description: "CulinaryAI is an innovative web app that uses Artificial Intelligence to help you discover, create, and personalize delicious recipes tailored to your taste. Whether you’re a seasoned chef or just starting out in the kitchen, CulinaryAI makes cooking smarter, easier, and more fun!",


      image: "/images/culinary-ai-app.png",
      tags: ["Typescript", "Next.js", "Genkit", "Google geminie"],
      status: ["Progress", "profitable"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  const communityItems = [
    {
      name: "Event Info",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu7d3s34RPQ8xiurBFqnuJRLokOmHYNpeOtQ&s",
    },
    {
      name: "Bizzbyte",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/biz%20byte-GdLa4WJbuXiihPgM9EPbHRfigMqoZa.png",
    },
    {
      name: "Campus Code",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20code-5dlFL503RVZ3qB2MyIbFg6cTOLSLly.png",
    },
    {
      name: "TON Society",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ton%20society-HFt5biJZO0pMSQf3LaW5ud1tldrtb1.png",
    },
    {
      name: "Synova Group",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/synova%20tech-uSC0VoxksNO2b4p3uEWarWdmvk7mkR.png",
    },
    {
      name: "Tech & Talk",
      logo: "/placeholder.svg?height=40&width=40&text=T&T",
    },
    {
      name: "Inventik",
      logo: "/placeholder.svg?height=40&width=40&text=INV",
    },
    {
      name: "MLSA Xiet",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mlsa%20xiet-IGAu9vvNHy4Cs9SHZ0rISEPYtjMtfE.png",
    },
    {
      name: "Xion Society",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/xion%20society-2VrQxaS9TnduzXU6FF571HINMASVl2.png",
    },
    {
      name: "Hack with India",
      logo: "/placeholder.svg?height=40&width=40&text=HWI",
    },
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent animate-pulse-slow pointer-events-none"></div>

      {/* Hero Section with redesigned layout */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <RedesignedHero />
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Work Experience
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              My professional journey and the companies I've had the pleasure to work with.
            </p>
          </motion.div>

          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              My Services
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Specialized services tailored to meet your digital needs with cutting-edge technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/services/web-development" passHref legacyBehavior>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[350px] cursor-pointer"
              >
                <ServiceCard
                  icon={<Globe className="text-cyan-400" />}
                  title="Web Development"
                  subtitle="Responsive. Scalable. Fast."
                  description="I build robust full-stack websites with modern frameworks — whether it's a landing page, CMS, or complex dashboard."
                  category="web-development"
                />
              </motion.div>
            </Link>

            <Link href="/services/ai-development" passHref legacyBehavior>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[350px] cursor-pointer"
              >
                <ServiceCard
                  icon={<Bot className="text-cyan-400" />}
                  title="Generative AI Development"
                  subtitle="AI that thinks with you."
                  description="Custom-built solutions using OpenAI, LangChain, and vector DBs. Chatbots, AI tools, content generators — future-ready and human-centered."
                  category="ai-development"
                />
              </motion.div>
            </Link>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/services">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-cyan-900/5 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 text-white relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative inline-block"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {"Featured Projects".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      className="inline-block relative"
                      initial={{
                        y: 100,
                        opacity: 0,
                        rotateX: -90,
                        filter: "blur(10px)",
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        filter: "blur(0px)",
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 120,
                        damping: 12,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(255,255,255,0.5)",
                        transition: { duration: 0.2 },
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}

                      {/* Character reflection effect */}
                      <motion.span
                        className="absolute top-full left-0 opacity-20 transform scale-y-[-1]"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.2 }}
                        transition={{ delay: index * 0.08 + 0.3 }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    </motion.span>
                  ))}

                  {/* Animated underline with gradient */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full"
                    initial={{ width: "0%", opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
                    style={{
                      background: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4)",
                      backgroundSize: "200% 100%",
                      animation: "gradient-flow 3s ease infinite",
                    }}
                  />

                  {/* Floating particles around title */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0,
                      }}
                      whileInView={{
                        x: Math.cos((i * 45 * Math.PI) / 180) * 150,
                        y: Math.sin((i * 45 * Math.PI) / 180) * 150,
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 2,
                        delay: 2 + i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                        ease: "easeOut",
                      }}
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  ))}

                  {/* Glitch effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 8,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      transform: "skewX(-20deg)",
                    }}
                  />

                  {/* Typing cursor with enhanced animation */}
                  <motion.span
                    className="inline-block w-1 h-12 bg-gradient-to-b from-purple-400 to-cyan-400 ml-2"
                    animate={{
                      opacity: [1, 0, 1],
                      scaleY: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: 4,
                      ease: "easeInOut",
                      delay: 2.5,
                    }}
                    style={{
                      background: "linear-gradient(180deg, #a855f7, #06b6d4)",
                    }}
                  />
                </motion.div>
              </motion.h2>
            </div>

            <motion.p
              className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {"Discover my latest creations - each project tells a unique story of innovation and creativity"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-1"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 1.2 + index * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -20,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="perspective-1000"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          {/* Enhanced View All Projects Button */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Floating particles around button */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                  animate={{
                    x: [0, Math.cos((i * 60 * Math.PI) / 180) * 100],
                    y: [0, Math.sin((i * 60 * Math.PI) / 180) * 100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative inline-block">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-full blur-xl opacity-70"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <Button
                className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-600 text-white border-none px-12 py-6 text-lg font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:shadow-purple-500/25"
                style={{
                  background: "linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 3s ease infinite",
                }}
              >
                <motion.span className="flex items-center gap-3" whileHover={{ x: 5 }}>
                  View All Projects
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    →
                  </motion.div>
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-purple-300">Contact Information</h3>
              <p className="text-gray-300">
                I'm currently available for freelance work, full-time positions, or collaborative projects. If you have
                a project that needs some creative touch, I'd love to hear about it!
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50">
                    <Mail className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-purple-300">rajan.jha114430@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50">
                    <Linkedin className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <Link
                      href="https://www.linkedin.com/in/rajan-jha-4a921828a/"
                      className="text-purple-300 hover:underline"
                    >
                      linkedin.com/in/Rajan Jha
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50">
                    <Smartphone className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <Link href="https://wa.me/+918860573577" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                      >
                        <Smartphone className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50">
                    <Github className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Github</p>
                    <Link href="https://github.com/ken-rolex" className="text-purple-300 hover:underline">
                      ken-rolex
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassMorphCard className="p-6">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    toast({
                      title: "Message sent!",
                      description: "Thanks for reaching out. I'll get back to you soon.",
                    })
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm text-purple-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="Rajan jha"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-purple-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="name"
                      className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="rajan@gmail.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-purple-300">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="Hello, I'd like to talk about..."
                    />
                  </div>

                  <GlowingButton type="submit" className="w-full">
                    Send Message
                  </GlowingButton>
                </form>
              </GlassMorphCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Ticker */}
      <EnhancedHorizontalTicker items={communityItems} speed={30} />

      {/* Footer */}
      <footer className="relative py-10 px-4 md:px-8 lg:px-16 border-t border-purple-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Link href="/" className="text-xl font-bold flex items-center gap-1">
                <span className="text-purple-500">&lt;</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                  Rajan Jha
                </span>
                <span className="text-purple-500">&gt;</span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Creating immersive digital experiences with cutting-edge technologies. Let's build something amazing
                together.
              </p>
            </div>

            <div className="flex justify-start md:justify-end gap-4">
              <Link
                href="https://github.com/ken-rolex"
                className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50 hover:bg-purple-800/50 transition-colors"
              >
                <Github className="h-5 w-5 text-purple-300" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rajan-jha-4a921828a/"
                className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50 hover:bg-purple-800/50 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-purple-300" />
              </Link>
              <Link
                href="https://x.com/rajanjh40593219"
                className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50 hover:bg-purple-800/50 transition-colors"
              >
                <Twitter className="h-5 w-5 text-purple-300" />
              </Link>
              <Link
                href="mailto:rajan.jha114430@gmail.com"
                className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50 hover:bg-purple-800/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-purple-300" />
              </Link>
              <Link
                href="https://wa.me/+918860573577"
                className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/50 hover:bg-purple-800/50 transition-colors"
              >
                <Smartphone className="h-5 w-5 text-purple-300" />
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-purple-900/50 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Rajan Jha. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <WhatsAppChatButton phoneNumber="+918860573577" />
    </main>
  )
}
