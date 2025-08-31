"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  slug: string
}

export default function BlogSection() {
  // Sample blog posts data
  const featuredPosts: BlogPost[] = [
    {
      id: "1",
      title: "Building Modern Web Applications with Next.js 15",
      excerpt:
        "Explore the latest features in Next.js 15 and how they can revolutionize your web development workflow. From improved performance to better developer experience.",
      content: "",
      image: "/placeholder.svg?height=400&width=600&text=Next.js+15",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
        bio: "Full Stack Developer passionate about modern web technologies",
      },
      publishedAt: "2024-01-15",
      readingTime: 8,
      category: "Web Development",
      tags: ["Next.js", "React", "JavaScript", "Web Development"],
      slug: "building-modern-web-applications-nextjs-15",
    },
    {
      id: "2",
      title: "The Future of AI in Web Development",
      excerpt:
        "How artificial intelligence is transforming the way we build websites and applications. From code generation to automated testing and beyond.",
      content: "",
      image: "/placeholder.svg?height=400&width=600&text=AI+Development",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
        bio: "Full Stack Developer passionate about modern web technologies",
      },
      publishedAt: "2024-01-10",
      readingTime: 12,
      category: "Artificial Intelligence",
      tags: ["AI", "Machine Learning", "Web Development", "Future Tech"],
      slug: "future-of-ai-in-web-development",
    },
    {
      id: "3",
      title: "Mastering TypeScript: Advanced Patterns and Best Practices",
      excerpt:
        "Deep dive into advanced TypeScript patterns that will make your code more robust, maintainable, and type-safe. Perfect for experienced developers.",
      content: "",
      image: "/placeholder.svg?height=400&width=600&text=TypeScript",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
        bio: "Full Stack Developer passionate about modern web technologies",
      },
      publishedAt: "2024-01-05",
      readingTime: 15,
      category: "Programming",
      tags: ["TypeScript", "JavaScript", "Programming", "Best Practices"],
      slug: "mastering-typescript-advanced-patterns",
    },
  ]

  return (
    <section id="blog" className="relative py-20 px-4 md:px-8 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Latest Blog Posts
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, AI, and the latest tech trends.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <GlassMorphCard className="overflow-hidden h-full hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] to-transparent opacity-70"></div>
                    <Badge className="absolute top-4 left-4 bg-purple-600/80 text-white border-none">
                      {post.category}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-purple-300 group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-purple-900/50 text-purple-300 border border-purple-500/50 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs text-gray-400">{post.author.name}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-purple-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </GlassMorphCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none">
              View All Blog Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
