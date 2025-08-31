import type { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CursorGlow from "@/components/cursor-glow"
import SplashScreen from "@/components/splash-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rajan Jha | Full Stack Developer",
  description: "",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SplashScreen />
          {children}
          <Toaster />
          <CursorGlow />
        </ThemeProvider>
      </body>
    </html>
  )
}
