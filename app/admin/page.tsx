"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Save, X, Mail, Users, FileText, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
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
  published: boolean
  views: number
  likes: number
}

interface Comment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  publishedAt: string
  approved: boolean
}

interface EmailSettings {
  smtpHost: string
  smtpPort: string
  smtpUser: string
  smtpPassword: string
  fromEmail: string
  fromName: string
  notifyOnComment: boolean
  notifyOnNewPost: boolean
  subscriberEmails: string[]
}

export default function AdminPanel() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [activeTab, setActiveTab] = useState("dashboard")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showPostEditor, setShowPostEditor] = useState(false)
  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "",
    fromName: "Rajan Jha Blog",
    notifyOnComment: true,
    notifyOnNewPost: true,
    subscriberEmails: [],
  })

  // Sample data
  useEffect(() => {
    // Load sample posts
    setPosts([
      {
        id: "1",
        title: "Building Modern Web Applications with Next.js 15",
        excerpt:
          "Explore the latest features in Next.js 15 and how they can revolutionize your web development workflow.",
        content: "# Building Modern Web Applications with Next.js 15\n\nNext.js 15 has arrived...",
        image: "/placeholder.svg?height=400&width=600&text=Next.js+15",
        author: { name: "Rajan Jha", avatar: "/placeholder.svg?height=100&width=100&text=RJ" },
        publishedAt: "2024-01-15",
        readingTime: 8,
        category: "Web Development",
        tags: ["Next.js", "React", "JavaScript"],
        slug: "building-modern-web-applications-nextjs-15",
        featured: true,
        published: true,
        views: 1250,
        likes: 42,
      },
      {
        id: "2",
        title: "The Future of AI in Web Development",
        excerpt: "How artificial intelligence is transforming the way we build websites and applications.",
        content: "# The Future of AI in Web Development\n\nAI is changing everything...",
        image: "/placeholder.svg?height=400&width=600&text=AI+Development",
        author: { name: "Rajan Jha", avatar: "/placeholder.svg?height=100&width=100&text=RJ" },
        publishedAt: "2024-01-10",
        readingTime: 12,
        category: "Artificial Intelligence",
        tags: ["AI", "Machine Learning", "Web Development"],
        slug: "future-of-ai-in-web-development",
        featured: false,
        published: true,
        views: 890,
        likes: 28,
      },
    ])

    // Load sample comments
    setComments([
      {
        id: "1",
        postId: "1",
        author: "John Doe",
        email: "john@example.com",
        content: "Great article! Very informative.",
        publishedAt: "2024-01-16",
        approved: true,
      },
      {
        id: "2",
        postId: "1",
        author: "Jane Smith",
        email: "jane@example.com",
        content: "Thanks for sharing this. Looking forward to more content.",
        publishedAt: "2024-01-17",
        approved: false,
      },
    ])

    // Load email settings from localStorage
    const savedSettings = localStorage.getItem("emailSettings")
    if (savedSettings) {
      setEmailSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication (in production, use proper authentication)
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true)
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel!",
      })
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ username: "", password: "" })
  }

  const handleSavePost = () => {
    if (!editingPost) return

    if (editingPost.id === "new") {
      // Create new post
      const newPost = {
        ...editingPost,
        id: Date.now().toString(),
        publishedAt: new Date().toISOString().split("T")[0],
        views: 0,
        likes: 0,
      }
      setPosts([newPost, ...posts])

      // Send email notification for new post
      if (emailSettings.notifyOnNewPost) {
        sendNewPostNotification(newPost)
      }
    } else {
      // Update existing post
      setPosts(posts.map((post) => (post.id === editingPost.id ? editingPost : post)))
    }

    setEditingPost(null)
    setShowPostEditor(false)
    toast({
      title: "Post saved",
      description: "The blog post has been saved successfully.",
    })
  }

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
    toast({
      title: "Post deleted",
      description: "The blog post has been deleted.",
    })
  }

  const handleApproveComment = (commentId: string) => {
    setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, approved: true } : comment)))
    toast({
      title: "Comment approved",
      description: "The comment has been approved and is now visible.",
    })
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId))
    toast({
      title: "Comment deleted",
      description: "The comment has been deleted.",
    })
  }

  const sendNewPostNotification = async (post: BlogPost) => {
    // Simulate sending email notification
    console.log("Sending new post notification:", post.title)
    toast({
      title: "Email notification sent",
      description: `Notification sent to ${emailSettings.subscriberEmails.length} subscribers.`,
    })
  }

  const sendCommentNotification = async (comment: Comment) => {
    // Simulate sending email notification
    console.log("Sending comment notification:", comment.content)
    toast({
      title: "Comment notification sent",
      description: "Admin has been notified of the new comment.",
    })
  }

  const saveEmailSettings = () => {
    localStorage.setItem("emailSettings", JSON.stringify(emailSettings))
    toast({
      title: "Settings saved",
      description: "Email settings have been saved successfully.",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <GlassMorphCard className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                Admin Panel
              </h1>
              <p className="text-gray-300">Sign in to manage your blog</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-purple-300">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="bg-purple-900/20 border-purple-500/30"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="bg-purple-900/20 border-purple-500/30"
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-purple-900/20 rounded-lg">
              <p className="text-xs text-gray-400 text-center">Demo credentials: admin / admin123</p>
            </div>
          </GlassMorphCard>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033] text-white">
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-purple-900/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Blog Admin Panel
          </h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 p-1 bg-purple-900/30 mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-purple-900/40">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-purple-900/40">
              <FileText className="mr-2 h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="comments" className="data-[state=active]:bg-purple-900/40">
              <Users className="mr-2 h-4 w-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-purple-900/40">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-900/40">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <GlassMorphCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Posts</p>
                    <p className="text-2xl font-bold text-purple-300">{posts.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-400" />
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <p className="text-2xl font-bold text-purple-300">
                      {posts.reduce((sum, post) => sum + post.views, 0)}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-cyan-400" />
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Comments</p>
                    <p className="text-2xl font-bold text-purple-300">{comments.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Subscribers</p>
                    <p className="text-2xl font-bold text-purple-300">{emailSettings.subscriberEmails.length}</p>
                  </div>
                  <Mail className="h-8 w-8 text-cyan-400" />
                </div>
              </GlassMorphCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <GlassMorphCard className="p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-300">{post.title}</p>
                        <p className="text-xs text-gray-400">
                          {post.views} views • {post.likes} likes
                        </p>
                      </div>
                      <Badge className={post.published ? "bg-green-600/30" : "bg-yellow-600/30"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Recent Comments</h3>
                <div className="space-y-4">
                  {comments.slice(0, 5).map((comment) => (
                    <div key={comment.id} className="border-l-2 border-purple-500/30 pl-4">
                      <p className="text-sm text-gray-300">{comment.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        by {comment.author} • {comment.publishedAt}
                      </p>
                      <Badge className={comment.approved ? "bg-green-600/30" : "bg-yellow-600/30"}>
                        {comment.approved ? "Approved" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlassMorphCard>
            </div>
          </TabsContent>

          {/* Posts Management */}
          <TabsContent value="posts">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">Manage Posts</h2>
              <Button
                onClick={() => {
                  setEditingPost({
                    id: "new",
                    title: "",
                    excerpt: "",
                    content: "",
                    image: "",
                    author: { name: "Rajan Jha", avatar: "/placeholder.svg?height=100&width=100&text=RJ" },
                    publishedAt: "",
                    readingTime: 0,
                    category: "",
                    tags: [],
                    slug: "",
                    featured: false,
                    published: false,
                    views: 0,
                    likes: 0,
                  })
                  setShowPostEditor(true)
                }}
                className="bg-gradient-to-r from-purple-600 to-cyan-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <div className="grid gap-6">
              {posts.map((post) => (
                <GlassMorphCard key={post.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-purple-300">{post.title}</h3>
                        <Badge className={post.published ? "bg-green-600/30" : "bg-yellow-600/30"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        {post.featured && <Badge className="bg-purple-600/30">Featured</Badge>}
                      </div>
                      <p className="text-gray-300 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{post.category}</span>
                        <span>{post.views} views</span>
                        <span>{post.likes} likes</span>
                        <span>{post.publishedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingPost(post)
                          setShowPostEditor(true)
                        }}
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeletePost(post.id)}
                        className="border-red-500/50 text-red-300 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassMorphCard>
              ))}
            </div>
          </TabsContent>

          {/* Comments Management */}
          <TabsContent value="comments">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">Manage Comments</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-600/30">{comments.filter((c) => !c.approved).length} Pending</Badge>
                <Badge className="bg-green-600/30">{comments.filter((c) => c.approved).length} Approved</Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {comments.map((comment) => (
                <GlassMorphCard key={comment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-purple-300">{comment.author}</span>
                        <span className="text-sm text-gray-400">{comment.email}</span>
                        <Badge className={comment.approved ? "bg-green-600/30" : "bg-yellow-600/30"}>
                          {comment.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-2">{comment.content}</p>
                      <p className="text-sm text-gray-400">
                        Posted on {comment.publishedAt} • Post ID: {comment.postId}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!comment.approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApproveComment(comment.id)}
                          className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="border-red-500/50 text-red-300 hover:bg-red-500/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </GlassMorphCard>
              ))}
            </div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-purple-300 mb-6">Email Settings</h2>

              <GlassMorphCard className="p-6 mb-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">SMTP Configuration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost" className="text-purple-300">
                      SMTP Host
                    </Label>
                    <Input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort" className="text-purple-300">
                      SMTP Port
                    </Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      placeholder="587"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser" className="text-purple-300">
                      SMTP Username
                    </Label>
                    <Input
                      id="smtpUser"
                      value={emailSettings.smtpUser}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword" className="text-purple-300">
                      SMTP Password
                    </Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      placeholder="your-app-password"
                    />
                  </div>
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6 mb-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Email Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifyOnComment" className="text-purple-300">
                        Notify on new comments
                      </Label>
                      <p className="text-sm text-gray-400">Get notified when someone comments on your posts</p>
                    </div>
                    <Switch
                      id="notifyOnComment"
                      checked={emailSettings.notifyOnComment}
                      onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, notifyOnComment: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifyOnNewPost" className="text-purple-300">
                        Notify subscribers on new posts
                      </Label>
                      <p className="text-sm text-gray-400">Send email to subscribers when you publish new posts</p>
                    </div>
                    <Switch
                      id="notifyOnNewPost"
                      checked={emailSettings.notifyOnNewPost}
                      onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, notifyOnNewPost: checked })}
                    />
                  </div>
                </div>
              </GlassMorphCard>

              <GlassMorphCard className="p-6 mb-6">
                <h3 className="text-lg font-bold text-purple-300 mb-4">Subscriber Management</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subscriberEmails" className="text-purple-300">
                      Subscriber Emails (one per line)
                    </Label>
                    <Textarea
                      id="subscriberEmails"
                      value={emailSettings.subscriberEmails.join("\n")}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          subscriberEmails: e.target.value.split("\n").filter((email) => email.trim()),
                        })
                      }
                      className="bg-purple-900/20 border-purple-500/30"
                      rows={6}
                      placeholder="subscriber1@example.com&#10;subscriber2@example.com"
                    />
                  </div>
                  <p className="text-sm text-gray-400">Total subscribers: {emailSettings.subscriberEmails.length}</p>
                </div>
              </GlassMorphCard>

              <Button onClick={saveEmailSettings} className="bg-gradient-to-r from-purple-600 to-cyan-500">
                <Save className="mr-2 h-4 w-4" />
                Save Email Settings
              </Button>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-purple-300 mb-6">General Settings</h2>

              <GlassMorphCard className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="blogTitle" className="text-purple-300">
                      Blog Title
                    </Label>
                    <Input
                      id="blogTitle"
                      defaultValue="Rajan Jha's Tech Blog"
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blogDescription" className="text-purple-300">
                      Blog Description
                    </Label>
                    <Textarea
                      id="blogDescription"
                      defaultValue="Insights, tutorials, and thoughts on web development, AI, and the latest tech trends."
                      className="bg-purple-900/20 border-purple-500/30"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postsPerPage" className="text-purple-300">
                      Posts per page
                    </Label>
                    <Input
                      id="postsPerPage"
                      type="number"
                      defaultValue="10"
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </GlassMorphCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Editor Modal */}
      {showPostEditor && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <GlassMorphCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-purple-300">
                  {editingPost.id === "new" ? "Create New Post" : "Edit Post"}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPostEditor(false)}
                  className="border-purple-500/50 text-purple-300"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postTitle" className="text-purple-300">
                      Title
                    </Label>
                    <Input
                      id="postTitle"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postSlug" className="text-purple-300">
                      Slug
                    </Label>
                    <Input
                      id="postSlug"
                      value={editingPost.slug}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postCategory" className="text-purple-300">
                      Category
                    </Label>
                    <Input
                      id="postCategory"
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postTags" className="text-purple-300">
                      Tags (comma separated)
                    </Label>
                    <Input
                      id="postTags"
                      value={editingPost.tags.join(", ")}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          tags: e.target.value.split(",").map((tag) => tag.trim()),
                        })
                      }
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postImage" className="text-purple-300">
                      Featured Image URL
                    </Label>
                    <Input
                      id="postImage"
                      value={editingPost.image}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={editingPost.published}
                        onCheckedChange={(checked) => setEditingPost({ ...editingPost, published: checked })}
                      />
                      <Label htmlFor="published" className="text-purple-300">
                        Published
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={editingPost.featured}
                        onCheckedChange={(checked) => setEditingPost({ ...editingPost, featured: checked })}
                      />
                      <Label htmlFor="featured" className="text-purple-300">
                        Featured
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postExcerpt" className="text-purple-300">
                      Excerpt
                    </Label>
                    <Textarea
                      id="postExcerpt"
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postContent" className="text-purple-300">
                      Content (Markdown)
                    </Label>
                    <Textarea
                      id="postContent"
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      className="bg-purple-900/20 border-purple-500/30"
                      rows={12}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowPostEditor(false)}
                  className="border-purple-500/50 text-purple-300"
                >
                  Cancel
                </Button>
                <Button onClick={handleSavePost} className="bg-gradient-to-r from-purple-600 to-cyan-500">
                  <Save className="mr-2 h-4 w-4" />
                  Save Post
                </Button>
              </div>
            </GlassMorphCard>
          </motion.div>
        </div>
      )}
    </div>
  )
}
