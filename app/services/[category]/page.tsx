"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"

// Define project data for each category
const projectsByCategory = {
  "web-development": [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store with product management, cart functionality, and payment processing.",
      image: "/placeholder.svg?height=400&width=600&text=E-Commerce+Platform",
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      status: ["Completed", "Profitable"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Corporate Dashboard",
      description: "Data visualization dashboard with real-time analytics and reporting features.",
      image: "/placeholder.svg?height=400&width=600&text=Corporate+Dashboard",
      tags: ["React", "D3.js", "Express", "PostgreSQL"],
      status: ["Completed", "Collaboration"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Blog Platform",
      description: "Content management system with markdown support, comments, and user authentication.",
      image: "/placeholder.svg?height=400&width=600&text=Blog+Platform",
      tags: ["Next.js", "Tailwind CSS", "Prisma", "Auth.js"],
      status: ["Progress", "Fun"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ],
  "app-development": [
    {
      title: "Fitness Tracker",
      description: "Mobile app for tracking workouts, nutrition, and progress with personalized recommendations.",
      image: "/placeholder.svg?height=400&width=600&text=Fitness+Tracker",
      tags: ["React Native", "Firebase", "Redux", "Health API"],
      status: ["Completed", "Fun"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Social Media App",
      description: "Cross-platform social networking app with real-time messaging and content sharing.",
      image: "/placeholder.svg?height=400&width=600&text=Social+Media+App",
      tags: ["Flutter", "Firebase", "GetX", "WebRTC"],
      status: ["Progress", "Collaboration"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Food Delivery App",
      description: "On-demand food delivery platform with restaurant listings, order tracking, and payment processing.",
      image: "/placeholder.svg?height=400&width=600&text=Food+Delivery+App",
      tags: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
      status: ["Completed", "Funding"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ],
  "ai-development": [
    {
      title: "AI Content Generator",
      description: "Tool that generates blog posts, marketing copy, and social media content using GPT-4.",
      image: "/placeholder.svg?height=400&width=600&text=AI+Content+Generator",
      tags: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel AI SDK"],
      status: ["Completed", "Profitable"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Customer Support Chatbot",
      description: "Intelligent chatbot that handles customer inquiries and routes complex issues to human agents.",
      image: "/placeholder.svg?height=400&width=600&text=Customer+Support+Chatbot",
      tags: ["React", "LangChain", "Node.js", "Pinecone"],
      status: ["Progress", "Collaboration"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "AI Image Generator",
      description: "Web app that creates custom images from text descriptions using Stable Diffusion.",
      image: "/placeholder.svg?height=400&width=600&text=AI+Image+Generator",
      tags: ["Next.js", "Replicate API", "Cloudinary", "Tailwind CSS"],
      status: ["Completed", "Fun"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ],
  "web3-development": [
    {
      title: "NFT Marketplace",
      description: "Platform for creating, buying, and selling digital collectibles with wallet integration.",
      image: "/placeholder.svg?height=400&width=600&text=NFT+Marketplace",
      tags: ["React", "Solidity", "Ethers.js", "IPFS"],
      status: ["Completed", "Funding"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "DeFi Dashboard",
      description: "Dashboard for managing cryptocurrency investments, staking, and yield farming.",
      image: "/placeholder.svg?height=400&width=600&text=DeFi+Dashboard",
      tags: ["Next.js", "Web3.js", "The Graph", "Tailwind CSS"],
      status: ["Progress", "Collaboration"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "DAO Governance Platform",
      description: "Decentralized governance platform for proposal creation, voting, and treasury management.",
      image: "/placeholder.svg?height=400&width=600&text=DAO+Governance",
      tags: ["React", "Solidity", "Hardhat", "Gnosis Safe"],
      status: ["Completed", "Profitable"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ],
  "web-design": [
    {
      title: "E-Commerce Redesign",
      description: "Complete UI/UX redesign for an online fashion retailer, focusing on conversion optimization.",
      image: "/placeholder.svg?height=400&width=600&text=E-Commerce+Redesign",
      tags: ["Figma", "UI/UX", "Prototyping", "User Research"],
      status: ["Completed", "Profitable"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "SaaS Dashboard",
      description: "Modern, intuitive dashboard design for a project management SaaS platform.",
      image: "/placeholder.svg?height=400&width=600&text=SaaS+Dashboard",
      tags: ["Adobe XD", "Design System", "Wireframing", "User Testing"],
      status: ["Progress", "Collaboration"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Mobile Banking App",
      description: "User-centered design for a mobile banking application with focus on accessibility and security.",
      image: "/placeholder.svg?height=400&width=600&text=Mobile+Banking+App",
      tags: ["Sketch", "Prototyping", "Interaction Design", "User Flows"],
      status: ["Completed", "Fun"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ],
}

// Category titles mapping
const categoryTitles = {
  "web-development": "Web Development Projects",
  "app-development": "App Development Projects",
  "ai-development": "Generative AI Projects",
  "web3-development": "Web3 & Blockchain Projects",
  "web-design": "Web Design Projects",
}

export default function CategoryProjectsPage() {
  const params = useParams()
  const router = useRouter()
  const [category, setCategory] = useState<string>("")
  const [projects, setProjects] = useState<any[]>([])
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    if (params.category) {
      const cat = params.category as string
      setCategory(cat)

      // Set projects based on category
      if (cat in projectsByCategory) {
        setProjects(projectsByCategory[cat as keyof typeof projectsByCategory])
        setTitle(categoryTitles[cat as keyof typeof categoryTitles])
      } else {
        // Handle invalid category
        router.push("/services")
      }
    }
  }, [params.category, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-purple-300 hover:text-purple-400 hover:bg-purple-900/20 mb-6"
            onClick={() => router.push("/services")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              {title}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle background elements only */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-purple-600/5 rounded-full filter blur-2xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-30 h-30 bg-cyan-500/5 rounded-full filter blur-2xl"
        animate={{
          scale: [1, 1.03, 1],
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
