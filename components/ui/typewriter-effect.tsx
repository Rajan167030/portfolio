"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface Word {
  text: string
  className?: string
}

interface TypewriterEffectProps {
  words: Word[]
  cursorClassName?: string
}

export function TypewriterEffect({ words, cursorClassName }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseBetweenWords = 1000

    const word = words[currentWordIndex]

    if (!isDeleting && currentCharIndex < word.text.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    }

    if (!isDeleting && currentCharIndex === word.text.length) {
      const timer = setTimeout(() => {
        setIsDeleting(true)
      }, pauseBetweenWords)
      return () => clearTimeout(timer)
    }

    if (isDeleting && currentCharIndex > 0) {
      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev - 1)
      }, deletingSpeed)
      return () => clearTimeout(timer)
    }

    if (isDeleting && currentCharIndex === 0) {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }
  }, [words, currentWordIndex, currentCharIndex, isDeleting])

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [10, 0],
      transition: { duration: 0.3 },
    })
  }, [currentWordIndex, controls])

  const currentWord = words[currentWordIndex]
  const displayText = currentWord.text.substring(0, currentCharIndex)

  return (
    <div className="inline-flex items-center">
      <motion.span animate={controls} className={currentWord.className}>
        {displayText}
      </motion.span>
      <span
        className={`ml-1 inline-block w-2 h-6 bg-purple-400 ${cursorClassName}`}
        style={{ animation: "blink 1s step-end infinite" }}
      ></span>
    </div>
  )
}
