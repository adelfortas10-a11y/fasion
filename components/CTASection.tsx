'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import ParticleField from './ParticleField';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Glow line that scales with scroll
      gsap.fromTo(
        '.cta-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-void-500"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <ParticleField density={0.6} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/8 blur-[140px]" />
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-neon-500/8 blur-[100px]" />

      {/* Top glow line */}
      <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-electric-500/40 to-transparent cta-line origin-left" />
      {/* Bottom glow line */}
      <div className="absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon-500/40 to-transparent cta-line origin-left" />

      {/* Content */}
      <div className="cta-content relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-500/20 bg-electric-500/5 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-electric-300">
          Limited Drop — 500 Pieces
        </div>

        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <span className="block text-foreground">Wear the</span>
          <span className="block text-gradient-bright glow-text">Future</span>
          <span className="block text-foreground">Today</span>
        </h2>

        <p className="mt-8 max-w-md text-base text-muted-foreground sm:text-lg">
          The NOVA FW/26 collection is available now. Each piece is numbered,
          crafted to order, and built to last a lifetime.
        </p>

        {/* CTA Button */}
        <a
          href="#"
          className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-5 text-base font-semibold text-void-500 transition-all duration-500"
        >
          {/* Animated gradient background */}
          <span className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-400 transition-all duration-500 group-hover:from-electric-300 group-hover:to-neon-300" />
          {/* Glow */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-electric-400 to-neon-400 opacity-50 blur-lg transition-all duration-500 group-hover:opacity-80 group-hover:blur-xl" />
          <span className="relative flex items-center gap-2">
            Shop the Collection
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </a>

        {/* Secondary links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <a
            href="#"
            className="group relative transition-colors hover:text-foreground"
          >
            Size Guide
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <span className="text-white/10">/</span>
          <a
            href="#"
            className="group relative transition-colors hover:text-foreground"
          >
            Shipping
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-400 transition-all duration-300 group-hover:w-full" />
          </a>
          <span className="text-white/10">/</span>
          <a
            href="#"
            className="group relative transition-colors hover:text-foreground"
          >
            Returns
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold text-gradient">
              NOVA
            </span>
            <span className="text-xs text-muted-foreground">
              © 2026 — Future Wear
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-electric-300">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-electric-300">
              TikTok
            </a>
            <a href="#" className="transition-colors hover:text-electric-300">
              Newsletter
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
