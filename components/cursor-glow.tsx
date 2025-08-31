"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Default to true to prevent hydration mismatch

  useEffect(() => {
    // Check if we're on a mobile device
    setIsMobile(window.innerWidth < 768)

    // Don't add event listeners on mobile devices
    if (window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  // Don't render cursor on mobile
  if (isMobile) return null

  return (
    <>
      <motion.div
        className="cursor-glow-outer fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(157,0,255,0.15) 0%, rgba(18,252,232,0.05) 70%, rgba(0,0,0,0) 100%)",
          filter: "blur(8px)",
        }}
      />
      <motion.div
        className="cursor-glow-inner fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #9D00FF 0%, #12FCE8 100%)",
          boxShadow: "0 0 10px 2px rgba(157,0,255,0.5)",
        }}
      />
    </>
  )
}
