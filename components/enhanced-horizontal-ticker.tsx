"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import Image from "next/image"
import { Pause, Play, RotateCcw } from "lucide-react"

interface TickerItem {
  name: string
  logo: string
}

interface EnhancedHorizontalTickerProps {
  items: TickerItem[]
  initialSpeed?: number
  initialDirection?: "left" | "right"
}

export default function EnhancedHorizontalTicker({
  items,
  initialSpeed = 30,
  initialDirection = "left",
}: EnhancedHorizontalTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const controls = useAnimationControls()

  // Enhanced state variables
  const [direction, setDirection] = useState<"left" | "right">(initialDirection)
  const [speed, setSpeed] = useState(initialSpeed)
  const [isPaused, setIsPaused] = useState(false)
  const [showControls, setShowControls] = useState(false)

  // Create seamless loop with 3 sets of items
  const duplicatedItems = [...items, ...items, ...items]

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 3)
    }

    // Start animation if not paused
    if (!isPaused) {
      controls.start({
        x: direction === "left" ? -width : 0,
        transition: {
          duration: width / speed,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      })
    } else {
      controls.stop()
    }
  }, [width, direction, speed, controls, isPaused])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 3)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Toggle direction
  const toggleDirection = () => {
    const newDirection = direction === "left" ? "right" : "left"
    setDirection(newDirection)
  }

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // Reset to initial state
  const resetTicker = () => {
    setDirection(initialDirection)
    setSpeed(initialSpeed)
    setIsPaused(false)
  }

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm py-8 border-y border-slate-700/50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Controls panel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -10 }}
        className="absolute top-2 right-4 z-50 flex gap-2"
      >
        <motion.button
          onClick={togglePause}
          className="bg-slate-800/80 backdrop-blur-md p-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-700/80 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </motion.button>

        <motion.button
          onClick={toggleDirection}
          className="bg-slate-800/80 backdrop-blur-md p-2 rounded-lg border border-slate-600/50 text-slate-300 hover:bg-slate-700/80 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} />
        </motion.button>
      </motion.div>

      {/* Speed indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute top-2 left-4 z-50"
      >
        <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-600/50">
          <span className="text-xs text-slate-400">
            {direction === "left" ? "→" : "←"} {speed}px/s
          </span>
        </div>
      </motion.div>

      {/* Main ticker content */}
      <div className="relative flex items-center py-4">
        <motion.div
          ref={containerRef}
          className="flex items-center gap-16 whitespace-nowrap"
          animate={controls}
          onMouseEnter={() => !isPaused && controls.stop()}
          onMouseLeave={() => {
            if (!isPaused) {
              controls.start({
                x: direction === "left" ? -width : 0,
                transition: {
                  duration: width / speed,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                },
              })
            }
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              {/* Logo container */}
              <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-slate-700/50 p-1">
                <div className="w-full h-full rounded-md overflow-hidden bg-white/10">
                  {item.logo ? (
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20">
                      <span className="text-sm font-bold text-slate-300">{item.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name and hover effects */}
              <div className="flex flex-col">
                <motion.span
                  className="text-base font-medium text-slate-200 tracking-wide"
                  animate={
                    hoveredIndex === index
                      ? {
                          color: "#e2e8f0",
                          textShadow: "0 0 8px rgba(139, 92, 246, 0.3)",
                        }
                      : {
                          color: "#cbd5e1",
                        }
                  }
                >
                  {item.name}
                </motion.span>

                {/* Animated underline on hover */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-1"
                  initial={{ width: 0, opacity: 0 }}
                  animate={hoveredIndex === index ? { width: "100%", opacity: 1 } : { width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Subtle glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
                initial={{ opacity: 0 }}
                animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-900/80 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-900/80 to-transparent pointer-events-none z-10" />

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        animate={{
          width: ["0%", "100%", "0%"],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
