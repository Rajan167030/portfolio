"use client"

import { useToast } from "@/hooks/use-toast"

interface EmailNotificationService {
  sendNewPostNotification: (post: any) => Promise<void>
  sendCommentNotification: (comment: any) => Promise<void>
  sendWelcomeEmail: (email: string) => Promise<void>
  addSubscriber: (email: string) => Promise<void>
  sendContactFormNotification: (formData: any) => Promise<void>
}

export const useEmailNotifications = (): EmailNotificationService => {
  const { toast } = useToast()

  const callEmailAPI = async (action: string, data: any) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...data }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Email service failed")
      }

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
        authorName: post.author?.name || "Admin",
      })

      toast({
        title: "Email notifications sent",
        description: "All subscribers have been notified of the new post.",
      })
    } catch (error) {
      toast({
        title: "Notification Error",
        description: "Failed to send email notifications.",
        variant: "destructive",
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
        title: "Notification Error",
        description: "Failed to send comment notification.",
        variant: "destructive",
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
        title: "Email Error",
        description: "Failed to send welcome email.",
        variant: "destructive",
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
        title: "Subscription Error",
        description: "Failed to subscribe to newsletter.",
        variant: "destructive",
      })
    }
  }

  const sendContactFormNotification = async (formData: any) => {
    try {
      await callEmailAPI("contact-form", {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })

      toast({
        title: "Message sent successfully",
        description: "Your message has been sent. I'll get back to you soon!",
      })
    } catch (error) {
      toast({
        title: "Message Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return {
    sendNewPostNotification,
    sendCommentNotification,
    sendWelcomeEmail,
    addSubscriber,
    sendContactFormNotification,
  }
}

// Default export for backward compatibility
export default useEmailNotifications
