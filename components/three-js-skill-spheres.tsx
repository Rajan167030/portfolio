"use client"

import { type ComponentType, useEffect, useState } from "react"

export default function ThreeJSSkillSpheres() {
  const [Component, setComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    // Dynamically import the actual Three.js component
    const importComponent = async () => {
      try {
        // Import the enhanced skill spheres
        const module = await import("@/components/three-js/dynamic-scenes")
        setComponent(() => module.DynamicSkillSpheres)
      } catch (error) {
        console.error("Failed to load Three.js skill spheres component:", error)

        // Fallback to simplified version if enhanced version fails
        try {
          const fallbackModule = await import("@/components/three-js/dynamic-scenes")
          setComponent(() => fallbackModule.DynamicSkillSpheres)
        } catch (fallbackError) {
          console.error("Failed to load fallback skill spheres component:", fallbackError)
        }
      }
    }

    importComponent()
  }, [])

  // Render a simple placeholder until the component is loaded
  if (!Component) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mb-4 animate-pulse"></div>
          <p className="text-purple-300">Loading skills visualization...</p>
        </div>
      </div>
    )
  }

  return <Component />
}
