"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"

interface TechStackProps {
  name: string
  icon: string
  category: string
}

export default function TechStackShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Updated categories as requested
  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "gen-ai", name: "Gen AI" },
    { id: "blockchain", name: "Blockchain" },
  ]

  // Updated tech stacks with user's specific skills
  const techStacks: TechStackProps[] = [
    // Frontend
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      category: "frontend",
    },
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      category: "frontend",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      category: "frontend",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      category: "frontend",
    },
    {
      name: "Shadcn UI",
      icon: "https://ui.shadcn.com/favicon.ico",
      category: "frontend",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      category: "frontend",
    },
    {
      name: "Three.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
      category: "frontend",
    },
    {
      name: "SASS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      category: "frontend",
    },
    {
      name: "Django",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
      category: "frontend",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      category: "frontend",
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
      category: "frontend",
    },
    {
      name: "Framer",
      icon: "https://www.framer.com/favicon.ico",
      category: "frontend",
    },
    {
      name: "Blender",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
      category: "frontend",
    },

    // Backend
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      category: "backend",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      category: "backend",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      category: "backend",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      category: "backend",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      category: "backend",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      category: "backend",
    },
    {
      name: "Kubernetes",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
      category: "backend",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      category: "backend",
    },
    {
      name: "Git Actions",
      icon: "https://github.githubassets.com/images/modules/site/features/actions-icon-actions.svg",
      category: "backend",
    },
    {
      name: "Vercel",
      icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
      category: "backend",
    },
    {
      name: "Netlify",
      icon: "https://www.netlify.com/favicon.ico",
      category: "backend",
    },
    {
      name: "Git Desktop",
      icon: "https://desktop.github.com/images/desktop-icon.svg",
      category: "backend",
    },
    {
      name: "Supabase",
      icon: "https://supabase.com/favicon.ico",
      category: "backend",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      category: "backend",
    },

    // Gen AI
    {
      name: "LangChain",
      icon: "https://avatars.githubusercontent.com/u/126733545",
      category: "gen-ai",
    },
    {
      name: "LangGraph",
      icon: "https://avatars.githubusercontent.com/u/126733545",
      category: "gen-ai",
    },
    {
      name: "Crew AI",
      icon: "https://docs.crewai.com/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "Crawl AI",
      icon: "https://crawl4ai.com/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "TensorFlow",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      category: "gen-ai",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      category: "gen-ai",
    },
    {
      name: "Hugging Face",
      icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
      category: "gen-ai",
    },
    {
      name: "Scikit-learn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      category: "gen-ai",
    },
    {
      name: "UV",
      icon: "https://docs.astral.sh/uv/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "Gradio",
      icon: "https://gradio.app/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "Llama Index",
      icon: "https://docs.llamaindex.ai/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "MLflow",
      icon: "https://mlflow.org/favicon.ico",
      category: "gen-ai",
    },
    {
      name: "n8n",
      icon: "https://n8n.io/favicon.ico",
      category: "gen-ai",
    },

    // Blockchain
    {
      name: "Ethereum",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg",
      category: "blockchain",
    },
    {
      name: "Solidity",
      icon: "https://cdn.worldvectorlogo.com/logos/solidity.svg",
      category: "blockchain",
    },
    {
      name: "Hardhat",
      icon: "https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png",
      category: "blockchain",
    },
    {
      name: "MetaMask",
      icon: "https://cdn.worldvectorlogo.com/logos/metamask.svg",
      category: "blockchain",
    },
  ]

  // Filter tech stacks based on active category and search query
  const filteredTechStacks = techStacks.filter((tech) => {
    const matchesCategory = activeCategory === "frontend" || tech.category === activeCategory
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get animation variants based on category
  const getAnimationVariants = (category: string, index: number) => {
    // Base animation for all items
    const baseAnimation = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: index * 0.05, // Staggered animation
        },
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.3 },
      },
    }

    // Category-specific hover animations
    switch (category) {
      case "ui-ux":
        return {
          ...baseAnimation,
          hover: {
            scale: 1.05,
            y: -10,
            boxShadow: "0 10px 25px -5px rgba(157, 23, 210, 0.4)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          },
        }
      case "frontend":
        return {
          ...baseAnimation,
          hover: {
            rotate: [0, -5, 5, -5, 0],
            scale: 1.08,
            transition: {
              rotate: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
              },
              scale: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
            },
          },
        }
      case "backend":
        return {
          ...baseAnimation,
          hover: {
            scale: 1.1,
            y: -5,
            x: [0, -3, 3, -3, 0],
            transition: {
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                duration: 1,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            },
          },
        }
      case "gen-ai":
        return {
          ...baseAnimation,
          hover: {
            scale: 1.15,
            rotate: [0, 0, 10, -10, 0],
            filter: "hue-rotate(60deg)",
            transition: {
              rotate: {
                repeat: 1,
                duration: 1.5,
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            },
          },
        }
      case "blockchain":
        return {
          ...baseAnimation,
          hover: {
            scale: 1.1,
            y: -8,
            rotateY: 180,
            transition: {
              rotateY: {
                duration: 0.8,
                ease: "easeInOut",
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10,
              },
            },
          },
        }
      default:
        return {
          ...baseAnimation,
          hover: {
            scale: 1.05,
            y: -5,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          },
        }
    }
  }

  // Get background gradient based on category
  const getBackgroundGradient = (category: string) => {
    switch (category) {
      case "ui-ux":
        return "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(167, 139, 250, 0.2) 100%)"
      case "frontend":
        return "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)"
      case "backend":
        return "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)"
      case "gen-ai":
        return "linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)"
      case "blockchain":
        return "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 70, 239, 0.2) 100%)"
      default:
        return "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)"
    }
  }

  // Get border color based on category
  const getBorderColor = (category: string) => {
    switch (category) {
      case "ui-ux":
        return "rgba(236, 72, 153, 0.5)"
      case "frontend":
        return "rgba(59, 130, 246, 0.5)"
      case "backend":
        return "rgba(6, 182, 212, 0.5)"
      case "gen-ai":
        return "rgba(249, 115, 22, 0.5)"
      case "blockchain":
        return "rgba(245, 158, 11, 0.5)"
      default:
        return "rgba(139, 92, 246, 0.5)"
    }
  }

  // Get glow color based on category
  const getGlowColor = (category: string) => {
    switch (category) {
      case "ui-ux":
        return "0 0 15px rgba(236, 72, 153, 0.5)"
      case "frontend":
        return "0 0 15px rgba(59, 130, 246, 0.5)"
      case "backend":
        return "0 0 15px rgba(6, 182, 212, 0.5)"
      case "gen-ai":
        return "0 0 15px rgba(249, 115, 22, 0.5)"
      case "blockchain":
        return "0 0 15px rgba(245, 158, 11, 0.5)"
      default:
        return "0 0 15px rgba(139, 92, 246, 0.5)"
    }
  }

  // Animation for particles
  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }

  return (
    <div className="space-y-8">
      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search technologies..."
            className="pl-10 bg-purple-900/20 border-purple-500/30 focus:border-purple-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((category) => (
            <Badge
              key={category.id}
              className={`cursor-pointer px-3 py-1 ${
                activeCategory === category.id
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-purple-900/50 hover:bg-purple-900/70"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tech stack grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTechStacks.map((tech, index) => {
            const animationVariants = getAnimationVariants(tech.category, index)
            const uniqueId = `${tech.category}-${tech.name}`
            const isHovered = hoveredItem === uniqueId

            return (
              <motion.div
                key={uniqueId}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={animationVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredItem(uniqueId)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    boxShadow: isHovered ? getGlowColor(tech.category) : "none",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Particles effect on hover */}
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getBorderColor(tech.category),
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        initial="initial"
                        animate={{
                          x: [0, (Math.random() - 0.5) * 50],
                          y: [0, (Math.random() - 0.5) * 50],
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          ease: "easeOut",
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                    ))}
                  </>
                )}

                <GlassMorphCard
                  className="p-4 flex flex-col items-center justify-center h-full aspect-square transition-all duration-300"
                  style={{
                    background: isHovered ? getBackgroundGradient(tech.category) : "",
                    borderColor: isHovered ? getBorderColor(tech.category) : "",
                    transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
                  }}
                >
                  <div className="relative w-12 h-12 mb-3">
                    <motion.img
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      className="w-full h-full object-contain"
                      style={{
                        filter: "drop-shadow(0px 2px 4px rgba(157, 0, 255, 0.3))",
                      }}
                      animate={
                        tech.category === "frontend" && isHovered
                          ? { rotate: 360 }
                          : tech.category === "gen-ai" && isHovered
                            ? { scale: [1, 1.2, 1] }
                            : {}
                      }
                      transition={
                        tech.category === "frontend"
                          ? { rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" } }
                          : tech.category === "gen-ai"
                            ? { scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }
                            : {}
                      }
                    />

                    {/* Category-specific animated indicators */}
                    {isHovered && (
                      <>
                        {tech.category === "ui-ux" && (
                          <motion.div
                            className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                        {tech.category === "backend" && (
                          <motion.div
                            className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                        {tech.category === "blockchain" && (
                          <motion.div
                            className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-500 rounded-full"
                            animate={{ scale: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </>
                    )}
                  </div>

                  <motion.p
                    className="text-center text-sm font-medium text-gray-300 transition-colors"
                    animate={{
                      color: isHovered
                        ? tech.category === "ui-ux"
                          ? "#f9a8d4"
                          : tech.category === "frontend"
                            ? "#93c5fd"
                            : tech.category === "backend"
                              ? "#67e8f9"
                              : tech.category === "gen-ai"
                                ? "#fdba74"
                                : tech.category === "blockchain"
                                  ? "#fcd34d"
                                  : "#d8b4fe"
                        : "#d1d5db",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {tech.name}
                  </motion.p>

                  <Badge
                    className="mt-2 text-xs border transition-all duration-300"
                    style={{
                      backgroundColor: isHovered
                        ? `${getBorderColor(tech.category).replace("0.5", "0.2")}`
                        : "rgba(139, 92, 246, 0.1)",
                      borderColor: isHovered ? getBorderColor(tech.category) : "rgba(139, 92, 246, 0.3)",
                      color: isHovered
                        ? tech.category === "ui-ux"
                          ? "#f9a8d4"
                          : tech.category === "frontend"
                            ? "#93c5fd"
                            : tech.category === "backend"
                              ? "#67e8f9"
                              : tech.category === "gen-ai"
                                ? "#fdba74"
                                : tech.category === "blockchain"
                                  ? "#fcd34d"
                                  : "#d8b4fe"
                        : "#d1d5db",
                    }}
                  >
                    {categories.find((c) => c.id === tech.category)?.name}
                  </Badge>
                </GlassMorphCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredTechStacks.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No technologies found matching your search.</p>
        </div>
      )}
    </div>
  )
}
