"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Code, Sparkles } from "lucide-react"

export default function SplashScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
          }, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 3) + 1
      })
    }, 50)

    // Show content after loading completes
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  // Hide splash screen after loading and animation complete
  if (!loading && showContent) return null

  return (
    <AnimatePresence>
      {(loading || !showContent) && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0014] via-[#100025] to-[#1a0033] overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-purple-500/30 backdrop-blur-sm"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-700/20 blur-3xl" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative flex items-center justify-center w-32 h-32">
                {/* Rotating Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-cyan-400 border-b-purple-500 border-l-cyan-400 opacity-70"
                />

                {/* Middle Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-purple-500 border-b-cyan-400 border-l-purple-500 opacity-70"
                />

                {/* Inner Content */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                      "0 0 30px rgba(34, 211, 238, 0.6)",
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/90 to-cyan-500/90 backdrop-blur-md"
                >
                  <span className="text-3xl font-bold text-white">RJ</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Name with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                RAJAN JHA
              </h1>
              <TypewriterText text= "" delay={80} />
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ width: "80%", opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-4/5 max-w-md mb-4"
            >
              <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                />
              </div>
            </motion.div>

            {/* Loading Text & Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
              <span className="text-sm">
                {progress < 30 && "Initializing..."}
                {progress >= 30 && progress < 60 && "Loading assets..."}
                {progress >= 60 && progress < 90 && "Preparing components..."}
                {progress >= 90 && "Almost ready..."}
              </span>
              <span className="text-sm font-mono text-cyan-400">{progress}%</span>
            </motion.div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
              <FloatingIcon Icon={Code} top="30%" left="20%" size={24} duration={3.5} />
              <FloatingIcon Icon={Sparkles} top="20%" left="70%" size={20} duration={4} />
              <FloatingIcon Icon={Code} top="70%" left="80%" size={28} duration={5} />
              <FloatingIcon Icon={Sparkles} top="75%" left="25%" size={22} duration={4.5} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Helper component for typewriter effect
function TypewriterText({ text, delay = 100 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [text, delay])

  return (
    <motion.p className="text-lg md:text-xl text-gray-300" initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 animate-pulse" />
      )}
    </motion.p>
  )
}

// Helper component for floating icons
function FloatingIcon({
  Icon,
  top,
  left,
  size = 24,
  duration = 4,
}: {
  Icon: any
  top: string
  left: string
  size?: number
  duration?: number
}) {
  return (
    <motion.div
      className="absolute text-purple-400/60"
      style={{ top, left }}
      animate={{
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        opacity: [0.4, 0.7, 0.4],
        rotate: [0, 10, 0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Icon size={size} />
    </motion.div>
  )
}
