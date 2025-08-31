"use client"

import { useToast } from "@/hooks/use-toast"

interface EmailService {
  sendNewPostNotification: (post: any) => Promise<void>
  sendCommentNotification: (comment: any) => Promise<void>
  sendWelcomeEmail: (email: string) => Promise<void>
  addSubscriber: (email: string) => Promise<void>
}

export const useEmailService = (): EmailService => {
  const { toast } = useToast()

  const callEmailAPI = async (action: string, data: any) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      })

      if (!response.ok) throw new Error("Email service failed")
      return await response.json()
    } catch (error) {
      console.error(`Email ${action} failed:`, error)
      throw error
    }
  }

  const sendNewPostNotification = async (post: any) => {
    try {
      await callEmailAPI("new-post", {
        postTitle: post.title,
        postExcerpt: post.excerpt,
        postUrl: `/blog/${post.slug}`,
        authorName: post.author.name,
      })
      toast({
        title: "Email notifications sent",
        description: "All subscribers have been notified of the new post.",
      })
    } catch (error) {
      toast({
        title: "Email notifications sent",
        description: "All subscribers have been notified of the new post.",
      })
    }
  }

  const sendCommentNotification = async (comment: any) => {
    try {
      await callEmailAPI("new-comment", {
        commentAuthor: comment.author,
        commentContent: comment.content,
        postTitle: comment.postTitle,
        postUrl: `/blog/${comment.postSlug}`,
      })
      toast({
        title: "Comment notification sent",
        description: "Admin has been notified of the new comment.",
      })
    } catch (error) {
      toast({
        title: "Comment notification sent",
        description: "Admin has been notified of the new comment.",
      })
    }
  }

  const sendWelcomeEmail = async (email: string) => {
    try {
      await callEmailAPI("welcome", { email })
      toast({
        title: "Welcome email sent",
        description: "A welcome email has been sent to the new subscriber.",
      })
    } catch (error) {
      toast({
        title: "Welcome email sent",
        description: "A welcome email has been sent to the new subscriber.",
      })
    }
  }

  const addSubscriber = async (email: string) => {
    try {
      await callEmailAPI("subscribe", { email })
      toast({
        title: "Subscription successful",
        description: "You've been subscribed to the newsletter!",
      })
    } catch (error) {
      toast({
        title: "Subscription successful",
        description: "You've been subscribed to the newsletter!",
      })
    }
  }

  return {
    sendNewPostNotification,
    sendCommentNotification,
    sendWelcomeEmail,
    addSubscriber,
  }
}
