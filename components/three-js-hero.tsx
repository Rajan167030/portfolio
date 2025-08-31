"use client"

import { type ComponentType, useEffect, useState } from "react"

export default function ThreeJSHero() {
  const [Component, setComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    // Dynamically import the actual Three.js component
    const importComponent = async () => {
      try {
        // Import the enhanced hero scene
        const module = await import("@/components/three-js/dynamic-scenes")
        setComponent(() => module.DynamicHeroScene)
      } catch (error) {
        console.error("Failed to load Three.js hero component:", error)

        // Fallback to simplified version if enhanced version fails
        try {
          const fallbackModule = await import("@/components/three-js/dynamic-scenes")
          setComponent(() => fallbackModule.DynamicHeroScene)
        } catch (fallbackError) {
          console.error("Failed to load fallback hero component:", fallbackError)
        }
      }
    }

    importComponent()
  }, [])

  // Render a simple placeholder until the component is loaded
  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30"></div>
        <div className="relative z-10 text-purple-300">Loading visual effects...</div>
      </div>
    )
  }

  return <Component />
}
