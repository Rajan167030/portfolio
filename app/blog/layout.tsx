import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0014] via-[#100025] to-[#1a0033]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/80 to-purple-800/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-1">
            <span className="text-purple-500">&lt;</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Rajan Jha
            </span>
            <span className="text-purple-500">&gt;</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-purple-300 hover:text-cyan-300 transition-colors">
              All Posts
            </Link>
            <Link href="/#contact" className="text-purple-300 hover:text-cyan-300 transition-colors">
              Contact
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-20">{children}</main>
    </div>
  )
}
