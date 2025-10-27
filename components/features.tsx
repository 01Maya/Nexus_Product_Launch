"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

const features = [
  {
    id: 1,
    title: "Lightning Fast",
    description: "Experience unprecedented speed with our advanced processing technology.",
    icon: "⚡",
    details: "Powered by next-generation processors delivering 10x faster performance than competitors.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "AI-Powered",
    description: "Intelligent features that learn and adapt to your needs.",
    icon: "🧠",
    details: "Machine learning algorithms that continuously improve your experience.",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Works perfectly with all your favorite devices and services.",
    icon: "🔗",
    details: "Universal compatibility with 500+ apps and services out of the box.",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Premium Build",
    description: "Crafted with aerospace-grade materials for ultimate durability.",
    icon: "💎",
    details: "Military-grade construction with lifetime warranty coverage.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: 5,
    title: "Eco-Friendly",
    description: "Sustainable design with zero environmental impact.",
    icon: "🌱",
    details: "100% recyclable materials and carbon-neutral manufacturing.",
    color: "from-green-500/20 to-teal-500/20",
  },
  {
    id: 6,
    title: "24/7 Support",
    description: "Round-the-clock customer support from our expert team.",
    icon: "🎧",
    details: "Dedicated support specialists available in 50+ languages.",
    color: "from-red-500/20 to-rose-500/20",
  },
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  /* Enhanced card animations with rotation and scale effects */
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.05, ease: "easeOut" },
    }),
  }

  return (
    <section id="features" ref={ref} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-3"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header with glass shine effect */}
        <motion.div variants={cardVariants} custom={0} className="mb-16 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 relative overflow-hidden"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-white/70 to-accent animate-shine-slant">
            Powerful Features
          </span>
        </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Discover what makes NEXUS the ultimate choice for discerning users.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              custom={i}
              variants={cardVariants}
              className="group relative"
              onMouseEnter={() => setHoveredId(feature.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative h-full rounded-2xl glass-effect p-6 cursor-pointer overflow-hidden border border-border group-hover:border-accent/30 transition-colors duration-300 interactive-hover"
                onClick={() => setExpandedId(expandedId === feature.id ? null : feature.id)}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={false}
                />

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: "inset 0 0 20px rgba(212, 175, 55, 0.1)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-4 inline-block"
                    animate={
                      expandedId === feature.id
                        ? { scale: 1.3, rotate: 10 }
                        : hoveredId === feature.id
                          ? { scale: 1.15, rotate: 5 }
                          : { scale: 1, rotate: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold mb-2 text-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground text-sm mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Expanded Content */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={expandedId === feature.id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-accent text-sm font-semibold pt-4 border-t border-border">{feature.details}</p>
                  </motion.div>

                  {/* Expand indicator */}
                  <motion.div
                    className="mt-4 text-accent text-sm font-semibold flex items-center gap-2"
                    animate={expandedId === feature.id ? { x: 4 } : { x: 0 }}
                  >
                    <span>{expandedId === feature.id ? "▼ Less" : "▶ More"}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
