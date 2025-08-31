"use client"

import type React from "react"

import { type HTMLAttributes, forwardRef, type ReactNode, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassMorphCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  intensity?: number
  glowOnHover?: boolean
}

export const GlassMorphCard = forwardRef<HTMLDivElement, GlassMorphCardProps>(
  ({ children, className, intensity = 10, glowOnHover = true, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    // Motion values for 3D effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
    const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

    // Glow effect based on mouse position
    const glowX = useTransform(x, [-0.5, 0.5], [-50, 50])
    const glowY = useTransform(y, [-0.5, 0.5], [-50, 50])

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const xPct = mouseX / width - 0.5
      const yPct = mouseY / height - 0.5

      x.set(xPct)
      y.set(yPct)
      rotateX.set(yPct * intensity)
      rotateY.set(xPct * -intensity)
    }

    function onMouseLeave() {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
    }

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          onMouseLeave()
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative rounded-xl overflow-hidden backdrop-blur-md transform-gpu",
          "bg-gradient-to-br from-purple-900/20 to-purple-900/10",
          "border border-purple-500/20",
          "shadow-[0_0_15px_rgba(157,0,255,0.15)]",
          "transition-shadow duration-300",
          isHovered && glowOnHover ? "shadow-[0_0_25px_rgba(157,0,255,0.3)]" : "",
          className,
        )}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
          },
        }}
        whileHover={{
          scale: 1.02,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          },
        }}
        whileTap={{
          scale: 0.98,
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
          },
        }}
        {...props}
      >
        {/* Subtle floating animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            y: ["-2%", "2%", "-2%"],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          }}
        />

        {/* Gradient overlay that follows mouse */}
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 pointer-events-none"
            style={{
              backgroundPosition: isHovered ? `${50 + glowX.get()}% ${50 + glowY.get()}%` : "50% 50%",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 0.5 : 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          />
        )}

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ boxShadow: "inset 0 0 0px rgba(157,0,255,0)" }}
          animate={{
            boxShadow:
              isHovered && glowOnHover ? "inset 0 0 15px rgba(157,0,255,0.3)" : "inset 0 0 0px rgba(157,0,255,0)",
            transition: { duration: 0.4, ease: "easeOut" },
          }}
        />

        {/* Content with 3D effect */}
        <motion.div
          className="relative z-10"
          style={{ transform: "translateZ(20px)" }}
          initial={{ opacity: 0.8 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3 },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    )
  },
)

GlassMorphCard.displayName = "GlassMorphCard"
