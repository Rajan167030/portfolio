"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"
import RotatingTechSphere from "@/components/rotating-tech-sphere"

export default function SkillsExpertiseSection() {
  // Define skill categories
  const skillCategories = [
    {
      name: "Frontend Development",
      skills: [
        { name: "React & Next.js", level: 95 },
        { name: "TypeScript & JavaScript", level: 90 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Responsive Design", level: 90 },
        { name: "UI/UX Implementation", level: 85 },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Node.js & Express", level: 90 },
        { name: "RESTful APIs", level: 95 },
        { name: "GraphQL", level: 85 },
        { name: "Authentication & Security", level: 80 },
        { name: "Serverless Architecture", level: 85 },
      ],
    },
    {
      name: "Database & DevOps",
      skills: [
        { name: "MongoDB & NoSQL", level: 90 },
        { name: "PostgreSQL & MySQL", level: 85 },
        { name: "Docker & Kubernetes", level: 80 },
        { name: "CI/CD Pipelines", level: 85 },
        { name: "Cloud Services (AWS, GCP, Azure)", level: 80 },
      ],
    },
  ]

  return (
    <section id="skills" className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Skills & Expertise
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            My technical expertise spans across various domains, with a focus on modern web technologies and cloud
            solutions.
          </p>
        </motion.div>

        {/* Rotating Tech Sphere */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <RotatingTechSphere />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <GlassMorphCard className="p-8 h-full">
                <h3 className="text-2xl font-bold text-center mb-8 text-purple-300">{category.name}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">{skill.name}</span>
                        <Badge className="bg-purple-900/50 text-purple-300 border border-purple-500/50">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="h-2 w-full bg-purple-900/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassMorphCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
