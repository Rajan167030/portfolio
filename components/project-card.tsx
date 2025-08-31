"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, Star, Eye, Clock, Smile, Users, TrendingUp, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    status: string[]
    github: string
    demo: string
  }
}

const getStatusConfig = (status: string) => {
  const configs = {
    Completed: {
      color: "text-green-400",
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      icon: <Star className="w-3 h-3" />,
    },
    Progress: {
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      icon: <Clock className="w-3 h-3" />,
    },
    Fun: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      icon: <Smile className="w-3 h-3" />,
    },
    Collaboration: {
      color: "text-purple-400",
      bg: "bg-purple-500/20",
      border: "border-purple-500/30",
      icon: <Users className="w-3 h-3" />,
    },
    Funding: {
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      icon: <TrendingUp className="w-3 h-3" />,
    },
    Profitable: {
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/30",
      icon: <DollarSign className="w-3 h-3" />,
    },
  }
  return configs[status as keyof typeof configs] || configs["Completed"]
}

export default function ProjectCard({ project }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Status badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
            {project.status.map((status) => {
              const config = getStatusConfig(status)
              return (
                <div
                  key={status}
                  className={`flex items-center gap-1 ${config.bg} ${config.border} border backdrop-blur-sm rounded-full px-2 py-1 text-xs ${config.color}`}
                >
                  {config.icon}
                  <span className="font-medium">{status}</span>
                </div>
              )
            })}
          </div>

          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay with buttons */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>4.9</span>
            </div>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white">
              <Eye className="w-3 h-3 text-blue-400" />
              <span>2.1k</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-white/5 text-gray-300 border border-white/10 text-xs hover:border-white/20 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
