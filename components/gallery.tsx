"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const galleryItems = [
  {
    id: 1,
    title: "Design Excellence",
    color: "from-accent/60 to-secondary/60",
    span: "md:col-span-2",
    image: "/nexusd1.png",
  },
  {
    id: 2,
    title: "Premium Materials",
    color: "from-secondary/60 to-accent/60",
    span: "",
    image: "/nexus1.png",
  },
  {
    id: 3,
    title: "Innovation",
    color: "from-accent/60 via-secondary/60 to-accent/60",
    span: "",
    image: "/nexus2.png",
  },
  {
    id: 4,
    title: "Performance",
    color: "from-secondary/60 to-accent/60",
    span: "md:col-span-2",
    image: "/nexusf.png",
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -50])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  }

  return (
    <section id="gallery" ref={containerRef} className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-3"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} custom={0} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative overflow-hidden">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-white/70 to-accent animate-shine-slant">
              Gallery
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the beauty and craftsmanship of NEXUS through our curated collection.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              custom={i}
              variants={itemVariants}
              className={`group relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer ${item.span}`}
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                  y: yOffset,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-70 group-hover:opacity-60 transition-opacity duration-500`}
              />

              {/* Dim / Shine Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 0.1 }}
              />

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0.7, y: 0 }}
                  whileHover={{ opacity: 1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <motion.div
                    className="w-12 h-1 bg-white mx-auto rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: 48 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              {/* Glow + Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "inset 0 0 30px rgba(255, 215, 0, 0.15), 0 0 30px rgba(255, 215, 0, 0.1)",
                }}
              />
              <motion.div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
