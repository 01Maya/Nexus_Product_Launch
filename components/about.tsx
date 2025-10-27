"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  /* Enhanced card animations with multiple effects */
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
      },
    }),
  }

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const features = [
    {
      title: "Premium Quality",
      description:
        "Crafted with meticulous attention to detail, every component of NEXUS is engineered to perfection. We use only the finest materials and cutting-edge manufacturing processes.",
      icon: "⚙️",
    },
    {
      title: "Innovative Design",
      description:
        "Our design philosophy combines minimalism with functionality. The result is a product that's not just beautiful, but intuitive and powerful.",
      icon: "✨",
    },
    {
      title: "Future-Ready",
      description:
        "Built with tomorrow's technology in mind. NEXUS is designed to evolve with your needs and stay relevant for years to come.",
      icon: "🚀",
    },
  ]

  return (
    <section id="about" ref={ref} className="relative py-20 overflow-hidden px-4 md:py-24 my-0">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header with glass shine effect */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center relative overflow-hidden">
            <motion.span
              className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-white/70 to-accent animate-shine-slant"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              About NEXUS
            </motion.span>
          </h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Engineered for perfection, designed for the future. NEXUS represents the pinnacle of innovation and luxury.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group glass-effect p-6 rounded-xl hover:border-accent/50 transition-all duration-300 border border-border interactive-hover"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)" }}
            >
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-accent mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Showcase Section */}
        <motion.div variants={itemVariants} className="relative">
          
        </motion.div>
      </motion.div>
    </section>
  )
}
