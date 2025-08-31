// Create a new About section component with a two-column layout

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass_morph_card"
import { Linkedin, Smartphone, Download, Github, Code, Trophy, Database, Zap } from "lucide-react"
// Add the import for TechStackShowcase at the top of the file
import TechStackShowcase from "@/components/tech-stack-showcase"

export default function AboutSection() {
  const techProfiles = [
    {
      name: "GitHub",
      url: "https://github.com/ken-rolex",
      icon: <Github className="w-8 h-8" />,
      color: "hover:text-gray-400",
      bgColor: "hover:bg-gray-900/20",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/Feynman_16/",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z" />
        </svg>
      ),
      color: "hover:text-orange-400",
      bgColor: "hover:bg-orange-500/20",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/rajan-jha-4a921828a/",
      icon: <Linkedin className="w-8 h-8" />,
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/20",
    },
    {
      name: "Stack Overflow",
      url: "https://stackoverflow.com/users/24840697/rajan-jha",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53H1.89zm2.133 6.397V17.6h14.92v4.267H4.023z" />
        </svg>
      ),
      color: "hover:text-orange-500",
      bgColor: "hover:bg-orange-600/20",
    },
    {
      name: "Kaggle",
      url: "https://kaggle.com/rajanjha",
      icon: <Database className="w-8 h-8" />,
      color: "hover:text-cyan-400",
      bgColor: "hover:bg-cyan-500/20",
    },
    {
      name: "CodeForces",
      url: "https://codeforces.com/profile/rajanjha",
      icon: <Code className="w-8 h-8" />,
      color: "hover:text-red-400",
      bgColor: "hover:bg-red-500/20",
    },
    {
      name: "HackerEarth",
      url: "https://hackerearth.com/@rajanjha",
      icon: <Zap className="w-8 h-8" />,
      color: "hover:text-purple-400",
      bgColor: "hover:bg-purple-500/20",
    },
    {
      name: "CodeChef",
      url: "https://codechef.com/users/rajanjha",
      icon: <Trophy className="w-8 h-8" />,
      color: "hover:text-amber-400",
      bgColor: "hover:bg-amber-500/20",
    },
  ]

  return (
    <section id="about" className="relative py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            About Me
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Column - Stylish About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <GlassMorphCard className="p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

              <h3 className="text-2xl font-bold text-purple-300 mb-6 relative z-10">About Me</h3>

              <div className="space-y-4 relative z-10">
                <p className="text-gray-300 leading-relaxed">
                  I'm a passionate tech enthusiast with a{" "}
                  <span className="text-cyan-400 font-semibold">problem-solving mindset</span> and a vision to create
                  meaningful impact through code. With{" "}
                  <span className="text-purple-300 font-semibold">core expertise in frontend and DevOps</span>, I
                  constantly explore new technologies to broaden my horizons.
                </p>

                <p className="text-gray-300 leading-relaxed">
                  As <span className="text-purple-300 font-semibold">co-founder of EventInfo</span> and a freelance
                  developer, I've realized that soft skills like communication, time management, and collaboration are
                  as vital as technical ability. My projects aim to solve{" "}
                  <span className="text-purple-300 font-semibold">
                    real-world problems while inspiring and engaging users
                  </span>
                  .
                </p>

                <p className="text-gray-300 leading-relaxed">
                  I believe technology isn't just a tool — it's a path to shape a better future, and{" "}
                  <span className="text-purple-300 font-semibold">my journey has only just begun</span>.
                </p>

                <p className="text-gray-100 font-semibold">
                  In essence, I do not merely code—I aspire to build, transform, and uplift. My voyage is far from over,
                  and with every line of code, I strive to inch closer to a world where technology serves as a beacon
                  for human progress.
                </p>

                <p className="text-amber-300 font-semibold">
                  A motivated and versatile individual, always eager to turn challenges into opportunities.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-4 relative z-10">
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>

                <Link href="https://www.linkedin.com/in/rajan-jha-4a921828a/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>

                <div className="text-center pt-4">
                  <Link href="#contact">
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Get In Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassMorphCard>
          </motion.div>

          {/* Right Column - Education & Tech Profiles */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Education Box */}
            <GlassMorphCard className="p-6 mb-8">
              <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                <Badge className="mr-2 bg-cyan-600/30 text-cyan-300 border border-cyan-500/50">Education</Badge>
              </h4>
              <div className="space-y-4">
                <div className="border-l-2 border-purple-500 pl-4">
                  <h5 className="text-lg font-semibold text-cyan-300">Bachelor of technology(cse-ds)</h5>
                  <p className="text-purple-200">Guru Gobind Singh Indrprastha University(GGSIPU)</p>
                  <p className="text-sm text-gray-400">2024-2028</p>
                  <p className="text-gray-300 mt-1">Specialized in Data Science</p>
                </div>
              </div>
            </GlassMorphCard>

            {/* Tech Profiles Icons */}
            <GlassMorphCard className="p-6">
              <h4 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
                <Badge className="mr-2 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-purple-300 border border-purple-500/50">
                  Tech Profiles
                </Badge>
              </h4>

              <p className="text-gray-300 mb-6 text-sm">Connect with me across various coding platforms</p>

              <div className="flex flex-wrap gap-4 justify-center">
                {techProfiles.map((profile, index) => (
                  <motion.a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.2,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      group relative p-4 rounded-xl transition-all duration-300
                      text-gray-400 ${profile.color} ${profile.bgColor}
                      border border-transparent hover:border-purple-500/30
                      backdrop-blur-sm
                    `}
                    title={profile.name}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center">{profile.icon}</div>

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {profile.name}
                    </div>

                    {/* Active indicator */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Additional info */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-xs text-gray-400">Click any icon to view my profile and coding journey</p>
              </motion.div>
            </GlassMorphCard>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Tech Stack
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full mb-8"></div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
            I've had the opportunity to work with a wide variety of languages, frameworks, and software to build some
            really cool and impactful projects. Along the way, I've developed deep expertise in several technologies—and
            I'm always curious, constantly learning, and excited to expand my skill set even further.
          </p>
          <TechStackShowcase />
        </motion.div>
      </div>
    </section>
  )
}
