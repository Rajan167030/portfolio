"use client"

import { motion } from "framer-motion"
import { Calendar, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GlassMorphCard } from "@/components/ui/glass-morph-card"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

interface ExperienceTimelineProps {
  experiences: Experience[]
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-400 transform md:translate-x-[-0.5px]"></div>

      <div className="space-y-12">
        {experiences.map((experience, index) => (
          <div key={index} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transform md:translate-x-[-10px] z-10"></div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:pl-4" : "md:pl-16 md:pr-4"} pl-10 md:pl-0`}
              >
                <GlassMorphCard className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-purple-300">{experience.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-gray-300">
                    <span>{experience.company}</span>
                    <span className="text-purple-500">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm">{experience.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-purple-900/50 text-purple-300 border border-purple-500/50 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </GlassMorphCard>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
