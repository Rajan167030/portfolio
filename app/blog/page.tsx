"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, Clock, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  author: {
    name: string
    avatar: string
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  slug: string
  featured: boolean
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  // Sample blog posts data
  const allPosts: BlogPost[] = [
    {
      id: "1",
      title: "Building Modern Web Applications with Next.js 15",
      excerpt:
        "Explore the latest features in Next.js 15 and how they can revolutionize your web development workflow. From improved performance to better developer experience.",
      image: "/placeholder.svg?height=400&width=600&text=Next.js+15",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2024-01-15",
      readingTime: 8,
      category: "Web Development",
      tags: ["Next.js", "React", "JavaScript", "Web Development"],
      slug: "building-modern-web-applications-nextjs-15",
      featured: true,
    },
    {
      id: "2",
      title: "The Future of AI in Web Development",
      excerpt:
        "How artificial intelligence is transforming the way we build websites and applications. From code generation to automated testing and beyond.",
      image: "/placeholder.svg?height=400&width=600&text=AI+Development",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2024-01-10",
      readingTime: 12,
      category: "Artificial Intelligence",
      tags: ["AI", "Machine Learning", "Web Development", "Future Tech"],
      slug: "future-of-ai-in-web-development",
      featured: true,
    },
    {
      id: "3",
      title: "Mastering TypeScript: Advanced Patterns and Best Practices",
      excerpt:
        "Deep dive into advanced TypeScript patterns that will make your code more robust, maintainable, and type-safe. Perfect for experienced developers.",
      image: "/placeholder.svg?height=400&width=600&text=TypeScript",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2024-01-05",
      readingTime: 15,
      category: "Programming",
      tags: ["TypeScript", "JavaScript", "Programming", "Best Practices"],
      slug: "mastering-typescript-advanced-patterns",
      featured: false,
    },
    {
      id: "4",
      title: "Building Scalable APIs with Node.js and Express",
      excerpt:
        "Learn how to build robust, scalable APIs using Node.js and Express. Cover authentication, rate limiting, caching, and deployment strategies.",
      image: "/placeholder.svg?height=400&width=600&text=Node.js+API",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2024-01-01",
      readingTime: 10,
      category: "Backend Development",
      tags: ["Node.js", "Express", "API", "Backend"],
      slug: "building-scalable-apis-nodejs-express",
      featured: false,
    },
    {
      id: "5",
      title: "CSS Grid vs Flexbox: When to Use Which",
      excerpt:
        "A comprehensive guide to understanding the differences between CSS Grid and Flexbox, and when to use each layout method for optimal results.",
      image: "/placeholder.svg?height=400&width=600&text=CSS+Layout",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2023-12-28",
      readingTime: 6,
      category: "CSS",
      tags: ["CSS", "Grid", "Flexbox", "Layout"],
      slug: "css-grid-vs-flexbox-guide",
      featured: false,
    },
    {
      id: "6",
      title: "Introduction to Web3 and Blockchain Development",
      excerpt:
        "Get started with Web3 development. Learn about blockchain basics, smart contracts, and how to build decentralized applications.",
      image: "/placeholder.svg?height=400&width=600&text=Web3+Blockchain",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
      },
      publishedAt: "2023-12-20",
      readingTime: 20,
      category: "Blockchain",
      tags: ["Web3", "Blockchain", "Smart Contracts", "DApps"],
      slug: "introduction-web3-blockchain-development",
      featured: false,
    },
  ]

  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.category)))]

  useEffect(() => {
    let filtered = allPosts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedCategory])

  const featuredPost = allPosts.find((post) => post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white">
      {/* Header */}
      <div className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Tech Blog
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development, AI, blockchain, and the latest tech trends.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 bg-purple-900/20 border-purple-500/30 focus:border-purple-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="border-purple-500/50"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="border-purple-500/50"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedCategory === category
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-purple-900/50 hover:bg-purple-900/70"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchQuery && (
        <div className="px-4 md:px-8 lg:px-16 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Featured Article</h2>
              <Link href={`/blog/${featuredPost.slug}`}>
                <GlassMorphCard className="overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <Image
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a0033]/50 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <Badge className="mb-4 bg-purple-600/80 text-white border-none">{featuredPost.category}</Badge>
                      <h3 className="text-2xl font-bold mb-4 text-purple-300 group-hover:text-cyan-300 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src={featuredPost.author.avatar || "/placeholder.svg"}
                            alt={featuredPost.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span>{featuredPost.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{featuredPost.readingTime} min read</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-purple-900/50 text-purple-300 border border-purple-500/50 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassMorphCard>
              </Link>
            </motion.div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid/List */}
      <div className="px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <h2 className="text-2xl font-bold mb-8 text-purple-300">
              {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
              <span className="text-gray-400 text-lg ml-2">({filteredPosts.length})</span>
            </h2>

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
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

                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-purple-900/50 text-purple-300 border border-purple-500/50 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </GlassMorphCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <GlassMorphCard className="overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group cursor-pointer">
                        <div className="grid md:grid-cols-3 gap-6 p-6">
                          <div className="relative h-48 md:h-32 overflow-hidden rounded-lg">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-purple-600/80 text-white border-none text-xs">{post.category}</Badge>
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.readingTime} min read</span>
                                </div>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-cyan-300 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  className="bg-purple-900/50 text-purple-300 border border-purple-500/50 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </GlassMorphCard>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
