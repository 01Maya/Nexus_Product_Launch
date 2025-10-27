"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const footerLinks = {
  Product: ["Features", "Pricing", "Security", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "API", "Community", "Support"],
  Legal: ["Privacy", "Terms", "Cookies", "License"],
}

const socialLinks = [
  { icon: "𝕏", label: "Twitter" },
  { icon: "📘", label: "Facebook" },
  { icon: "📷", label: "Instagram" },
  { icon: "💼", label: "LinkedIn" },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer ref={ref} className="relative border-t border-border bg-gradient-to-b from-background to-surface-accent">
      <motion.div
        className="max-w-6xl mx-auto px-4 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-2xl font-bold gradient-text mb-4">NEXUS</h3>
            <p className="text-sm text-muted-foreground">
              Redefining the future of technology with innovation and excellence.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          variants={itemVariants}
        />

        {/* Bottom Footer */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© 2025 NEXUS. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href="#"
                className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all border border-border"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
