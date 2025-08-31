"use client"
import { useState, useRef } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  subtitle: string
  description: string
  category: string
  shape: string
  gradient: string
  borderGradient: string
  index: number
}

export default function ServiceCard({
  icon,
  title,
  subtitle,
  description,
  category,
  shape,
  gradient,
  borderGradient,
  index,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer w-full max-w-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -10,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Glow Effect Background */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${borderGradient} rounded-3xl blur-lg opacity-0`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Card */}
      <motion.div
        className={`
          relative w-full h-[400px]
          bg-gradient-to-br ${gradient}
          ${shape}
          shadow-2xl
          backdrop-blur-sm
          border border-white/20
          overflow-hidden
          p-8
          flex flex-col
        `}
        animate={{
          boxShadow: isHovered ? `0 25px 50px -12px rgba(147, 51, 234, 0.4)` : `0 10px 25px -3px rgba(0, 0, 0, 0.3)`,
        }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
          }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 2px, transparent 2px)
            `,
            backgroundSize: "200% 200%, 40px 40px, 40px 40px",
          }}
        />

        {/* Service Number Badge */}
        <motion.div
          className="absolute -top-3 -right-3 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center font-bold text-white border border-white/30"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <motion.div
            className="text-6xl mb-6 self-start"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{title}</h3>

          {/* Subtitle */}
          <p className="text-white/80 text-sm font-medium mb-4 uppercase tracking-wider">{subtitle}</p>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <motion.button
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors border border-white/20"
              whileHover={{ scale: 1.05, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-4 right-16 w-3 h-3 bg-white/30 rounded-full"
          animate={{
            y: isHovered ? [-3, 3, -3] : [0],
            opacity: isHovered ? [0.3, 0.7, 0.3] : [0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-16 left-4 w-2 h-2 bg-white/30 rounded-full"
          animate={{
            y: isHovered ? [3, -3, 3] : [0],
            opacity: isHovered ? [0.3, 0.7, 0.3] : [0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0"
          animate={{
            x: isHovered ? ["-100%", "100%"] : "-100%",
            opacity: isHovered ? [0, 1, 0] : 0,
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  )
}
