"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Consolidated Three.js components with fallback support
export function DynamicHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Enhanced Three.js Hero Scene
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight1 = new THREE.PointLight(0x9d00ff, 2, 20)
      pointLight1.position.set(5, 5, 5)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0x12fce8, 2, 20)
      pointLight2.position.set(-5, -5, -5)
      scene.add(pointLight2)

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry()
      const particlesCount = 2000
      const posArray = new Float32Array(particlesCount * 3)
      const colorsArray = new Float32Array(particlesCount * 3)

      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10
        if (i % 3 === 0) {
          colorsArray[i] = 0.616
          colorsArray[i + 1] = 0
          colorsArray[i + 2] = 1
        } else {
          colorsArray[i] = 0.071
          colorsArray[i + 1] = 0.988
          colorsArray[i + 2] = 0.91
        }
      }

      particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
      particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
      scene.add(particlesMesh)

      // Create torus knot
      const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
      const torusKnotMaterial = new THREE.MeshStandardMaterial({
        color: 0x12fce8,
        emissive: 0x12fce8,
        emissiveIntensity: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      })
      const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
      scene.add(torusKnot)

      // Create text sprite
      const createTextSprite = (text: string) => {
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        if (!context) return null

        canvas.width = 512
        canvas.height = 256
        context.fillStyle = "rgba(0, 0, 0, 0)"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.font = "Bold 80px Arial"
        context.textAlign = "center"
        context.fillStyle = "#12fce8"
        context.fillText(text, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
        const sprite = new THREE.Sprite(material)
        sprite.scale.set(4, 2, 1)
        sprite.position.set(0, -1, 0)
        return sprite
      }

      const portfolioText = createTextSprite("PORTFOLIO")
      if (portfolioText) scene.add(portfolioText)

      // Animation
      let mouseX = 0
      let mouseY = 0

      const animate = () => {
        requestAnimationFrame(animate)
        particlesMesh.rotation.x += 0.001
        particlesMesh.rotation.y += 0.001
        torusKnot.rotation.x += 0.01
        torusKnot.rotation.y += 0.005
        particlesMesh.rotation.x = mouseY * 0.0005
        particlesMesh.rotation.y = mouseX * 0.0005
        renderer.render(scene, camera)
      }

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = event.clientX - window.innerWidth / 2
        mouseY = event.clientY - window.innerHeight / 2
      }

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("resize", handleResize)
      animate()

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        torusKnotGeometry.dispose()
        torusKnotMaterial.dispose()
      }
    } catch (error) {
      console.error("Three.js failed, using fallback:", error)
      setFallback(true)
    }
  }, [])

  if (fallback) {
    return <SimplifiedHeroFallback />
  }

  return <div ref={containerRef} className="w-full h-full" />
}

export function DynamicSkillSpheres() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills = [
    {
      name: "React",
      color: "#2b2a2a",
      size: 2,
      category: "frontend",
      logo: "https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png",
    },
    {
      name: "Next.js",
      color: "#2b2a2a",
      size: 2,
      category: "frontend",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV9uzErWz9EXqZDxZ5lP9aYpMz8eK6rr5X3w&s",
    },
    {
      name: "TypeScript",
      color: "#3178C6",
      size: 2,
      category: "frontend",
      logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
    },
    {
      name: "Node.js",
      color: "#339933",
      size: 2,
      category: "backend",
      logo: "https://static-00.iconduck.com/assets.00/logo-nodejs-icon-1755x2048-ejfcifdr.png",
    },
    {
      name: "MongoDB",
      color: "#47A248",
      size: 2,
      category: "backend",
      logo: "https://pbs.twimg.com/profile_images/1452637606559326217/GFz_P-5e_400x400.png",
    },
    {
      name: "Docker",
      color: "#2496ED",
      size: 2,
      category: "cloud",
      logo: "https://cdn.worldvectorlogo.com/logos/docker.svg",
    },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    try {
      // Enhanced Three.js Skill Spheres implementation
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 15

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight1 = new THREE.PointLight(0x9d00ff, 2, 50)
      pointLight1.position.set(10, 10, 10)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0x12fce8, 2, 50)
      pointLight2.position.set(-10, -10, -10)
      scene.add(pointLight2)

      // Create skill spheres
      const spheres: THREE.Mesh[] = []
      const textureLoader = new THREE.TextureLoader()

      skills.forEach((skill, i) => {
        const geometry = new THREE.SphereGeometry(skill.size * 0.4, 32, 32)
        const material = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: new THREE.Color(skill.color),
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 0.2,
        })

        const mesh = new THREE.Mesh(geometry, material)
        const angle = (i / skills.length) * Math.PI * 2
        const radius = 5
        mesh.position.x = Math.cos(angle) * radius
        mesh.position.y = Math.sin(angle) * radius
        mesh.position.z = (Math.random() - 0.5) * 2

        scene.add(mesh)
        spheres.push(mesh)
        mesh.userData = { name: skill.name, originalScale: skill.size * 0.4 }
      })

      // Animation
      const animate = () => {
        requestAnimationFrame(animate)
        scene.rotation.y += 0.002
        scene.rotation.x += 0.001
        spheres.forEach((sphere, i) => {
          sphere.rotation.y += 0.002 * (i % 2 === 0 ? 1 : -1)
        })
        renderer.render(scene, camera)
      }

      const handleResize = () => {
        if (!containerRef.current) return
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      }

      window.addEventListener("resize", handleResize)
      animate()

      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }
        spheres.forEach((sphere) => {
          sphere.geometry.dispose()
          ;(sphere.material as THREE.Material).dispose()
        })
        renderer.dispose()
      }
    } catch (error) {
      console.error("Three.js skill spheres failed, using fallback:", error)
      setFallback(true)
    }
  }, [])

  if (fallback) {
    return <SimplifiedSkillsFallback hoveredSkill={hoveredSkill} />
  }

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      {hoveredSkill && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-900/80 text-white rounded-md backdrop-blur-sm border border-purple-500/30 text-lg font-bold">
          {hoveredSkill}
        </div>
      )}
    </div>
  )
}

// Fallback components for when Three.js fails
function SimplifiedHeroFallback() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#9D00FF" : "#12FCE8",
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width)
      gradient.addColorStop(0, "rgba(157, 0, 255, 0.1)")
      gradient.addColorStop(1, "rgba(18, 252, 232, 0.05)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1
      })

      ctx.font = "bold 48px Inter"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = "#12FCE8"
      ctx.fillText("PORTFOLIO", width / 2, height / 2)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      if (container.contains(canvas)) {
        container.removeChild(canvas)
      }
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

function SimplifiedSkillsFallback({ hoveredSkill }: { hoveredSkill: string | null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mb-4 animate-pulse"></div>
        <p className="text-purple-300">Skills visualization loading...</p>
      </div>
      {hoveredSkill && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-900/80 text-white rounded-md backdrop-blur-sm border border-purple-500/30">
          {hoveredSkill}
        </div>
      )}
    </div>
  )
}
