"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, Heart, ArrowLeft, Facebook, Twitter, Linkedin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass_morph_card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEmailNotifications } from "@/components/email-notification-service"

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
    social: {
      twitter?: string
      linkedin?: string
      github?: string
    }
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  slug: string
  likes: number
  views: number
}

interface Comment {
  id: string
  author: string
  email: string
  content: string
  publishedAt: string
  replies?: Comment[]
}

export default function BlogPostPage() {
  const params = useParams()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: "", email: "", content: "" })
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const emailService = useEmailNotifications()

  // Sample blog post data
  const blogPosts: Record<string, BlogPost> = {
    "building-modern-web-applications-nextjs-15": {
      id: "1",
      title: "Building Modern Web Applications with Next.js 15",
      excerpt:
        "Explore the latest features in Next.js 15 and how they can revolutionize your web development workflow.",
      content: `
# Building Modern Web Applications with Next.js 15

Next.js 15 has arrived with groundbreaking features that are set to revolutionize how we build modern web applications. In this comprehensive guide, we'll explore the most significant updates and how they can enhance your development workflow.

## What's New in Next.js 15?

### 1. Improved Performance
Next.js 15 introduces several performance optimizations that make your applications faster than ever:

- **Enhanced Image Optimization**: The new Image component now supports WebP and AVIF formats by default
- **Automatic Bundle Splitting**: Smarter code splitting reduces initial bundle sizes
- **Improved Caching**: Better caching strategies for both static and dynamic content

### 2. Developer Experience Enhancements

The developer experience has been significantly improved with:

\`\`\`javascript
// New App Router features
import { Suspense } from 'react'
import { Loading } from './loading'

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  )
}
\`\`\`

### 3. Server Components Evolution

Server Components have evolved to provide better performance and developer experience:

- **Streaming Support**: Components can now stream content as it becomes available
- **Improved Error Handling**: Better error boundaries and error reporting
- **Enhanced TypeScript Support**: Better type inference and error messages

## Getting Started with Next.js 15

To start using Next.js 15 in your project, simply run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

### Key Features to Explore

1. **App Router**: The new routing system that provides better performance and developer experience
2. **Server Actions**: Handle form submissions and mutations directly on the server
3. **Parallel Routes**: Load multiple pages simultaneously for better user experience

## Best Practices

When working with Next.js 15, keep these best practices in mind:

- Use Server Components by default, Client Components only when necessary
- Implement proper error boundaries for better error handling
- Leverage the new caching strategies for optimal performance
- Use TypeScript for better development experience

## Conclusion

Next.js 15 represents a significant step forward in web development. With its improved performance, better developer experience, and powerful new features, it's the perfect time to upgrade your applications and take advantage of these enhancements.

The future of web development is here, and Next.js 15 is leading the way. Start building your next project with these powerful new features and experience the difference yourself.
      `,
      image: "/placeholder.svg?height=400&width=800&text=Next.js+15",
      author: {
        name: "Rajan Jha",
        avatar: "/placeholder.svg?height=100&width=100&text=RJ",
        bio: "Full Stack Developer passionate about modern web technologies. I love building scalable applications and sharing knowledge with the community.",
        social: {
          twitter: "https://twitter.com/rajanjha",
          linkedin: "https://linkedin.com/in/rajan-jha",
          github: "https://github.com/ken-rolex",
        },
      },
      publishedAt: "2024-01-15",
      readingTime: 8,
      category: "Web Development",
      tags: ["Next.js", "React", "JavaScript", "Web Development"],
      slug: "building-modern-web-applications-nextjs-15",
      likes: 42,
      views: 1250,
    },
  }

  useEffect(() => {
    if (params.slug) {
      const foundPost = blogPosts[params.slug as string]
      if (foundPost) {
        setPost(foundPost)
        // Simulate loading comments
        setComments([
          {
            id: "1",
            author: "John Doe",
            email: "john@example.com",
            content:
              "Great article! The new features in Next.js 15 look amazing. Can't wait to try them out in my next project.",
            publishedAt: "2024-01-16",
          },
          {
            id: "2",
            author: "Sarah Smith",
            email: "sarah@example.com",
            content:
              "Thanks for the detailed explanation. The performance improvements are exactly what I was looking for.",
            publishedAt: "2024-01-17",
          },
        ])
      }
    }
  }, [params.slug])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLike = () => {
    setLiked(!liked)
    if (post) {
      setPost({
        ...post,
        likes: liked ? post.likes - 1 : post.likes + 1,
      })
    }
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = post?.title || ""

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast({
          title: "Link copied!",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.author && newComment.email && newComment.content) {
      const comment: Comment = {
        id: Date.now().toString(),
        ...newComment,
        publishedAt: new Date().toISOString().split("T")[0],
      }
      setComments([...comments, comment])
      setNewComment({ author: "", email: "", content: "" })

      // Send email notification
      emailService.sendCommentNotification({
        ...comment,
        postTitle: post?.title,
        postSlug: post?.slug,
      })

      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      })
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-300 mb-4">Post not found</h1>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-purple-900/30 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link
              href="/blog"
              className="inline-flex items-center text-purple-400 hover:text-cyan-400 mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-6">
              <Badge className="mb-4 bg-purple-600/80 text-white border-none">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                {post.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">{post.excerpt}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{post.views} views</span>
              </div>
            </div>

            <div className="relative h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <GlassMorphCard className="p-8 mb-8">
                  <div className="prose prose-invert max-w-none">
                    <div
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: post.content
                          .replace(/\n/g, "<br/>")
                          .replace(
                            /```(\w+)?\n([\s\S]*?)```/g,
                            '<pre class="bg-purple-900/30 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>',
                          )
                          .replace(
                            /`([^`]+)`/g,
                            '<code class="bg-purple-900/50 px-2 py-1 rounded text-purple-300">$1</code>',
                          )
                          .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-purple-300 mt-8 mb-4">$1</h3>')
                          .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-purple-300 mt-8 mb-4">$1</h2>')
                          .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-purple-300 mt-8 mb-4">$1</h1>'),
                      }}
                    />
                  </div>
                </GlassMorphCard>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-purple-300 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} className="bg-purple-900/50 text-purple-300 border border-purple-500/50">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <GlassMorphCard className="p-6 mb-8">
                  <div className="flex items-start gap-4">
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-purple-300 mb-2">{post.author.name}</h3>
                      <p className="text-gray-300 mb-4">{post.author.bio}</p>
                      <div className="flex gap-2">
                        {post.author.social.twitter && (
                          <Link href={post.author.social.twitter} target="_blank">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {post.author.social.linkedin && (
                          <Link href={post.author.social.linkedin} target="_blank">
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                            >
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassMorphCard>

                {/* Comments Section */}
                <GlassMorphCard className="p-6">
                  <h3 className="text-xl font-bold text-purple-300 mb-6">Comments ({comments.length})</h3>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Your Name"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                        className="bg-purple-900/20 border-purple-500/30"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        className="bg-purple-900/20 border-purple-500/30"
                        required
                      />
                    </div>
                    <Textarea
                      placeholder="Write your comment..."
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30 mb-4"
                      rows={4}
                      required
                    />
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-cyan-500">
                      Post Comment
                    </Button>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-purple-500/30 pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-purple-300">{comment.author}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </GlassMorphCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                {/* Share & Like */}
                <GlassMorphCard className="p-4">
                  <h3 className="font-bold text-purple-300 mb-4">Share this article</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      onClick={() => handleShare("copy")}
                    >
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <Button
                      variant="outline"
                      className={`w-full justify-start border-purple-500/50 hover:bg-purple-500/20 ${
                        liked ? "text-red-400 border-red-500/50" : "text-purple-300"
                      }`}
                      onClick={handleLike}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-current" : ""}`} />
                      {liked ? "Liked" : "Like"} ({post.likes})
                    </Button>
                  </div>
                </GlassMorphCard>

                {/* Table of Contents */}
                <GlassMorphCard className="p-4">
                  <h3 className="font-bold text-purple-300 mb-4">Table of Contents</h3>
                  <div className="space-y-2 text-sm">
                    <Link href="#introduction" className="block text-gray-300 hover:text-purple-300 transition-colors">
                      Introduction
                    </Link>
                    <Link href="#whats-new" className="block text-gray-300 hover:text-purple-300 transition-colors">
                      What's New in Next.js 15?
                    </Link>
                    <Link
                      href="#getting-started"
                      className="block text-gray-300 hover:text-purple-300 transition-colors"
                    >
                      Getting Started
                    </Link>
                    <Link
                      href="#best-practices"
                      className="block text-gray-300 hover:text-purple-300 transition-colors"
                    >
                      Best Practices
                    </Link>
                    <Link href="#conclusion" className="block text-gray-300 hover:text-purple-300 transition-colors">
                      Conclusion
                    </Link>
                  </div>
                </GlassMorphCard>

                {/* Newsletter Signup */}
                <GlassMorphCard className="p-4">
                  <h3 className="font-bold text-purple-300 mb-4">Subscribe to Newsletter</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Get the latest articles and tutorials delivered to your inbox.
                  </p>
                  <form className="space-y-2">
                    <Input type="email" placeholder="Your email" className="bg-purple-900/20 border-purple-500/30" />
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">Subscribe</Button>
                  </form>
                </GlassMorphCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
