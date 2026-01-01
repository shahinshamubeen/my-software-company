import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "WYDGT transformed our ML infrastructure from a liability into a competitive advantage. Our data scientists now ship models 10x faster.",
    author: "Dr. Sarah Chen",
    role: "VP of AI",
    company: "Nexus Technologies",
    color: "#00FF9D",
  },
  {
    quote:
      "The team delivered a payment system that handles billions in monthly volume with 99.999% uptime. They're not just developers—they're strategic partners.",
    author: "Marcus Williams",
    role: "CTO",
    company: "Velocity FinTech",
    color: "#6366F1",
  },
  {
    quote:
      "We went from idea to HIPAA-compliant platform in 4 months. WYDGT understood healthcare regulations and built security into every layer.",
    author: "Dr. Emily Rodriguez",
    role: "Founder & CEO",
    company: "HealthBridge",
    color: "#BF00FF",
  },
  {
    quote:
      "Their AI integration doubled our customer support capacity while cutting response times by 60%. The ROI was evident within weeks.",
    author: "James Park",
    role: "Head of Operations",
    company: "ScaleUp Commerce",
    color: "#FF9900",
  },
  {
    quote:
      "WYDGT rebuilt our entire cloud infrastructure and reduced our AWS bill by 40%. The migration was seamless with zero downtime.",
    author: "Lisa Nakamura",
    role: "VP of Engineering",
    company: "DataFlow Analytics",
    color: "#00FF9D",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 transition-colors duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${testimonial.color}20, transparent 70%)`,
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-warning-yellow border border-warning-yellow/30 rounded-full">
            Client Stories
          </span>
          <h2 className="text-display-md font-display font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-white/70">
            Don't just take our word for it—hear from the companies we've helped
            transform.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative glass-card rounded-2xl p-8 md:p-12 border border-glass-border min-h-[300px]">
            {/* Quote icon */}
            <div
              className="absolute top-6 left-6 text-6xl font-serif opacity-20 transition-colors duration-500"
              style={{ color: testimonial.color }}
              aria-hidden="true"
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 pl-8">
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pl-8">
                  {/* Avatar placeholder */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{
                      backgroundColor: `${testimonial.color}20`,
                      color: testimonial.color,
                    }}
                  >
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <cite className="not-italic font-display font-semibold text-white">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm text-white/60">
                      {testimonial.role} at{" "}
                      <span style={{ color: testimonial.color }}>
                        {testimonial.company}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute right-6 bottom-6 flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dots indicator */}
          <div
            className="flex items-center justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    index === current
                      ? "w-8 bg-cyber-lime"
                      : "bg-white/20 hover:bg-white/40"
                  }
                `}
                role="tab"
                aria-selected={index === current ? "true" : "false"}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <p className="text-center text-xs text-white/40 mt-4">
              Paused — hover to read
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
