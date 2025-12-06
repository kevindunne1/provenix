'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DecryptingTitleProps {
  text: string
  className?: string
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export default function DecryptingTitle({ text, className = '' }: DecryptingTitleProps) {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '))
  const [isDecrypting, setIsDecrypting] = useState(true)

  useEffect(() => {
    let frame = 0
    const maxFrames = 30 // Fast and mechanical

    const interval = setInterval(() => {
      frame++

      setDisplayText(() =>
        text.split('').map((char, index) => {
          // Already locked in
          if (frame > (index + 1) * 2) {
            return char
          }

          // Still randomizing
          if (char === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
      )

      if (frame >= maxFrames) {
        setDisplayText(text.split(''))
        setIsDecrypting(false)
        clearInterval(interval)
      }
    }, 50) // 50ms interval = fast mechanical feel

    return () => clearInterval(interval)
  }, [text])

  return (
    <h1 className={`font-mono ${className}`}>
      {displayText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: !isDecrypting || char === text[index] ? 1 : 0.5,
            color: !isDecrypting || char === text[index] ? '#ffffff' : '#64748B'
          }}
          transition={{
            duration: 0.1,
            ease: 'easeOut'
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  )
}
