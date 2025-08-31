"use client"

import type React from "react"

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    // Ensure onClick is properly handled even if undefined
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event)
      }
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex h-10 items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white shadow-lg transition-all",
          "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600",
          "overflow-hidden",
          className,
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 0.8,
            transition: { duration: 0.3 },
          }}
        />
        <motion.span
          className="absolute inset-0 -z-10 blur-xl bg-gradient-to-r from-purple-600 to-cyan-500 opacity-50"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 0.8,
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
        />
      </motion.button>
    )
  },
)

GlowingButton.displayName = "GlowingButton"
