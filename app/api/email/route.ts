import { type NextRequest, NextResponse } from "next/server"

// Consolidated email service handling all email operations
export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case "new-post":
        return await handleNewPostNotification(data)
      case "new-comment":
        return await handleCommentNotification(data)
      case "subscribe":
        return await handleSubscription(data)
      case "welcome":
        return await handleWelcomeEmail(data)
      default:
        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Email service error:", error)
    return NextResponse.json({ success: false, error: "Email service failed" }, { status: 500 })
  }
}

async function handleNewPostNotification(data: any) {
  const { postTitle, postExcerpt, postUrl, authorName } = data

  console.log("Sending new post notification:", { postTitle, postExcerpt, postUrl, authorName })

  const emailTemplate = `
    <h2>New Post: ${postTitle}</h2>
    <p>Hi there!</p>
    <p>${authorName} just published a new blog post:</p>
    <blockquote>${postExcerpt}</blockquote>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}${postUrl}">Read the full post</a></p>
    <p>Best regards,<br>The Blog Team</p>
  `

  return NextResponse.json({ success: true, message: "New post notifications sent successfully" })
}

async function handleCommentNotification(data: any) {
  const { commentAuthor, commentContent, postTitle, postUrl } = data

  console.log("Sending comment notification:", { commentAuthor, commentContent, postTitle, postUrl })

  const emailTemplate = `
    <h2>New Comment on: ${postTitle}</h2>
    <p>A new comment has been posted by ${commentAuthor}:</p>
    <blockquote>${commentContent}</blockquote>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}${postUrl}">View the post</a></p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Manage in Admin Panel</a></p>
  `

  return NextResponse.json({ success: true, message: "Comment notification sent" })
}

async function handleSubscription(data: any) {
  const { email } = data

  console.log("New subscriber:", email)

  // Send welcome email automatically
  await handleWelcomeEmail({ email })

  return NextResponse.json({ success: true, message: "Subscription successful" })
}

async function handleWelcomeEmail(data: any) {
  const { email } = data

  console.log("Sending welcome email to:", email)

  const emailTemplate = `
    <h2>Welcome to Rajan Jha's Tech Blog!</h2>
    <p>Hi there!</p>
    <p>Thank you for subscribing to my newsletter. You'll now receive updates whenever I publish new content about web development, AI, and the latest tech trends.</p>
    <p>Here's what you can expect:</p>
    <ul>
      <li>🚀 Latest tutorials and insights</li>
      <li>💡 Tips and best practices</li>
      <li>🔥 Industry news and trends</li>
      <li>📚 Exclusive content for subscribers</li>
    </ul>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog">Browse all posts</a></p>
    <p>Best regards,<br>Rajan Jha</p>
    <hr>
    <p><small>You can unsubscribe at any time by clicking <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${email}">here</a>.</small></p>
  `

  return NextResponse.json({ success: true, message: "Welcome email sent" })
}
