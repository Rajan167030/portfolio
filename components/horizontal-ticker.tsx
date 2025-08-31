"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface TickerItem {
  name: string
  logo: string
}

interface HorizontalTickerProps {
  items: TickerItem[]
  speed?: number
  direction?: "left" | "right"
}

export default function HorizontalTicker({ items, speed = 25, direction = "left" }: HorizontalTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  const duplicatedItems = [...items, ...items]

  useEffect(() => {
    if (tickerRef.current) {
      setWidth(tickerRef.current.scrollWidth / 2) // only original items width
    }
  }, [items])

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-purple-900/30 to-purple-900/10 backdrop-blur-sm py-6 border-t border-b border-purple-500/20">
      <div className="relative flex items-center">
        <motion.div
          ref={tickerRef}
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{
            x: direction === "left" ? [0, -width] : [-width, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration: width / speed,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex items-center gap-3 mx-6">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={item.logo || "/placeholder.svg"}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-medium text-purple-300">{item.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
