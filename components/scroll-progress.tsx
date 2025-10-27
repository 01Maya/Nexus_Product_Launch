"use client"

import { motion } from "framer-motion"

interface ScrollProgressProps {
  progress: number
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent via-secondary to-accent z-50"
      style={{ width: `${progress}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}
