"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Hero", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Launch", href: "#countdown" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [showDynamicIsland, setShowDynamicIsland] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
      setShowDynamicIsland(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile menu animation variant (scaleY is more reliable than animating height:auto)
  const mobileMenuAnim = {
    hidden: { scaleY: 0, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    visible: { scaleY: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  return (
    <>
      {/* Desktop Dynamic Island Navbar */}
      <AnimatePresence>
        {showDynamicIsland && (
          <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="glass-effect px-8 py-3 rounded-full border border-accent/20 flex items-center gap-6 shadow-lg shadow-accent/10"
              whileHover={{ boxShadow: "0 0 30px rgba(230, 194, 0, 0.2)" }}
            >
              {/* Logo */}
              <motion.div className="text-lg font-bold gradient-text whitespace-nowrap" whileHover={{ scale: 1.05 }}>
                NEXUS
              </motion.div>

              {/* Divider */}
              <div className="w-px h-6 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" />

              {/* Nav Items */}
              <div className="flex items-center gap-6">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-xs font-medium text-muted-foreground hover:text-accent transition-colors relative group whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" />

              {/* CTA Button */}
              <motion.button
                className="px-5 py-1.5 rounded-full bg-accent text-accent-foreground font-semibold text-xs hover:shadow-lg hover:shadow-accent/50 transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pre-order
              </motion.button>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Static Top Navbar (before scroll) */}
      {!showDynamicIsland && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-40 hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`mx-auto px-6 py-4 transition-all duration-300 ${isScrolled ? "glass-effect rounded-b-2xl" : "bg-transparent"}`}
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Logo */}
              <motion.div className="text-2xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
                NEXUS
              </motion.div>

              {/* Nav Items */}
              <div className="flex items-center gap-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                className="px-6 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Pre-order
              </motion.button>
            </div>
          </motion.div>
        </motion.nav>
      )}

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-effect px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="text-xl font-bold gradient-text" whileHover={{ scale: 1.05 }}>
              NEXUS
            </motion.div>

            <motion.button
              onClick={() => setIsMobileOpen((s) => !s)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                id="mobile-menu"
                key="mobile-menu"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuAnim}
                style={{ transformOrigin: "top" }}
                className="mt-4 space-y-2 overflow-hidden"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-accent hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                    whileHover={{ x: 6 }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.button
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:shadow-lg hover:shadow-accent/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  Pre-order
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  )
}
