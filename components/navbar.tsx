"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { Github, Mail, Menu, X, Smartphone } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [glassEffect, setGlassEffect] = useState(true)
  const isMobile = useMobile()
  const navRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-500 ${
            scrolled || glassEffect
              ? `${
                  glassEffect
                    ? "bg-gradient-to-r from-purple-900/20 via-purple-800/15 to-cyan-900/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20"
                    : "bg-gradient-to-r from-purple-900/80 to-purple-800/80 backdrop-blur-md shadow-lg border-b border-purple-500/20"
                } rounded-2xl mx-4 mt-2`
              : "bg-transparent"
          }`}
          style={
            glassEffect
              ? {
                  background:
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(6, 182, 212, 0.1) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 8px 32px rgba(147, 51, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }
              : {}
          }
        >
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center gap-1">
            <span className="text-purple-500">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Rajan Jha
            </span>
            <span className="text-purple-500">&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <NavItem3D key={item.name} href={item.href} scrolled={scrolled}>
                  {item.name}
                </NavItem3D>
              ))}
            </div>
          )}

          {/* Contact buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button3D
              variant="ghost"
              size="icon"
              className={`text-gray-300 hover:text-white transition-all duration-300 ${
                glassEffect
                  ? "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                  : "hover:bg-purple-900/50"
              }`}
              onClick={() => setGlassEffect(!glassEffect)}
              title={glassEffect ? "Disable Glass Effect" : "Enable Glass Effect"}
            >
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  glassEffect
                    ? "bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg shadow-purple-400/50"
                    : "bg-gray-400"
                }`}
              />
            </Button3D>
            <Link href="https://github.com/ken-rolex" target="_blank" rel="noopener noreferrer">
              <Button3D variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-900/50">
                <Github className="h-5 w-5" />
              </Button3D>
            </Link>
            <Link href="mailto:rajan.jha114430@gmail.com">
              <Button3D variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-900/50">
                <Mail className="h-5 w-5" />
              </Button3D>
            </Link>
            <Link href="https://wa.me/+918860573577" target="_blank" rel="noopener noreferrer">
              <Button3D className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none">
                <Smartphone className="mr-2 h-4 w-4" />
                Get In Touch
              </Button3D>
            </Link>
          </div>

          {/* Mobile menu button */}
          {isMobile && (
            <Button3D
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button3D>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 ${
            glassEffect
              ? "bg-gradient-to-b from-purple-900/30 via-purple-800/20 to-cyan-900/30 backdrop-blur-2xl"
              : "bg-gradient-to-b from-purple-900/95 to-purple-800/95 backdrop-blur-lg"
          } ${mobileMenuOpen ? "flex" : "hidden"} flex-col pt-20 px-6`}
          style={
            glassEffect
              ? {
                  background:
                    "linear-gradient(180deg, rgba(147, 51, 234, 0.2) 0%, rgba(79, 70, 229, 0.15) 50%, rgba(6, 182, 212, 0.2) 100%)",
                  backdropFilter: "blur(25px)",
                  WebkitBackdropFilter: "blur(25px)",
                }
              : {}
          }
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="text-xl font-medium text-gray-200 hover:text-purple-300 py-3 border-b border-purple-500/20 flex"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button3D
              variant="outline"
              size="icon"
              className={`transition-all duration-300 ${
                glassEffect
                  ? "border-white/30 text-purple-300 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  : "border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              }`}
              onClick={() => setGlassEffect(!glassEffect)}
              title={glassEffect ? "Disable Glass Effect" : "Enable Glass Effect"}
            >
              <div
                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                  glassEffect
                    ? "bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg shadow-purple-400/50"
                    : "bg-gray-400"
                }`}
              />
            </Button3D>
            <Link href="https://github.com/ken-rolex" target="_blank" rel="noopener noreferrer">
              <Button3D
                variant="outline"
                size="icon"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                <Github className="h-5 w-5" />
              </Button3D>
            </Link>
            <Link href="mailto:rajan.jha114430@gmail.com">
              <Button3D
                variant="outline"
                size="icon"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                <Mail className="h-5 w-5" />
              </Button3D>
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              href="https://wa.me/+918860573577"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button3D className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none">
                <Smartphone className="mr-2 h-4 w-4" />
                Get In Touch
              </Button3D>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  )
}

// 3D Navigation Item with gravity effect
function NavItem3D({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 })
  const itemRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!itemRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
    rotateX.set(yPct * 10)
    rotateY.set(xPct * -10)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <Link href={href}>
        <span
          className={`text-sm font-medium ${
            scrolled ? "text-gray-200 hover:text-white" : "text-gray-300 hover:text-white"
          } transition-colors inline-block py-2 px-3 rounded-md hover:bg-purple-500/10`}
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </span>
      </Link>
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

// 3D Button with gravity effect
interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  children: React.ReactNode
}

function Button3D({ variant = "default", size = "default", className = "", children, ...props }: Button3DProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
    rotateX.set(yPct * 10)
    rotateY.set(xPct * -10)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  let variantClasses = ""
  let sizeClasses = ""

  // Variant classes
  switch (variant) {
    case "outline":
      variantClasses = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      break
    case "ghost":
      variantClasses = "hover:bg-accent hover:text-accent-foreground"
      break
    default:
      variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90"
  }

  // Size classes
  switch (size) {
    case "sm":
      sizeClasses = "h-9 px-3 text-xs"
      break
    case "lg":
      sizeClasses = "h-11 px-8 text-base"
      break
    case "icon":
      sizeClasses = "h-10 w-10"
      break
    default:
      sizeClasses = "h-10 px-4 py-2 text-sm"
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      <span style={{ transform: "translateZ(10px)" }}>{children}</span>
    </motion.button>
  )
}
