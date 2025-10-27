"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Particle effect for hover
const ParticleEffect = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full"
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default function Countdown() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [notified, setNotified] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // 30 days from now

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = launchDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div
      className="flex flex-col items-center cursor-default"
      onMouseEnter={() => setHoveredUnit(label)}
      onMouseLeave={() => setHoveredUnit(null)}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl glass-effect flex items-center justify-center mb-4 border border-accent/30 hover:border-accent/60 transition-all duration-300 overflow-hidden">
        {hoveredUnit === label && <ParticleEffect />}
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text select-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider select-none">
        {label}
      </p>
    </div>
  );

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative py-20 md:py-32 px-4 overflow-hidden text-center"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-5"
          animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 relative overflow-hidden">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent via-white/70 to-accent animate-shine-slant">
            Launch Countdown
          </span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-12">
          Get ready for the most anticipated product launch of the year.
        </p>

        {/* Timer */}
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap mb-12">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((unit) => (
            <motion.div
              key={unit.label}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <TimeUnit value={unit.value} label={unit.label} />
            </motion.div>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-accent to-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent/40 transition-all"
            onClick={() => setNotified(!notified)}
          >
            {notified ? "✓ Notification Set" : "Notify Me"}
          </button>
          <button className="px-8 py-3 rounded-full glass-effect text-accent font-semibold border border-accent/30 hover:border-accent/60 hover:bg-accent/5 transition-all">
            Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}
