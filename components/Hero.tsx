'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './ParticleField';
import { ArrowDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to('.hero-content', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('.hero-particles', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="hero-particles absolute inset-0">
        <ParticleField density={1} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 circuit-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-void-500/40 via-transparent to-void-500" />

      {/* Glow orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-electric-500/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-neon-500/10 blur-[120px]" />

      {/* Content */}
      <div className="hero-content relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-500/20 bg-electric-500/5 px-4 py-1.5 text-xs font-medium text-electric-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          FW/26 Collection — Now Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <span className="block text-foreground">WHERE</span>
          <span className="block text-gradient-bright glow-text">TECHNOLOGY</span>
          <span className="block text-foreground">MEETS THREAD</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          A garment engineered for the future. Scroll to explore the full 360°
          experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-[-120px] flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-electric-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
