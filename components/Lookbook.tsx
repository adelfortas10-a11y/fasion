'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOOKS = [
  {
    id: 'l1',
    image:
      'https://images.pexels.com/photos/34921744/pexels-photo-34921744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Signal / 01',
    tag: 'Outerwear',
    span: 'lg',
  },
  {
    id: 'l2',
    image:
      'https://images.pexels.com/photos/28863302/pexels-photo-28863302.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Shadow / 02',
    tag: 'Layering',
    span: 'sm',
  },
  {
    id: 'l3',
    image:
      'https://images.pexels.com/photos/11668854/pexels-photo-11668854.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Pulse / 03',
    tag: 'Knitwear',
    span: 'sm',
  },
  {
    id: 'l4',
    image:
      'https://images.pexels.com/photos/37851062/pexels-photo-37851062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Echo / 04',
    tag: 'Tailoring',
    span: 'lg',
  },
  {
    id: 'l5',
    image:
      'https://images.pexels.com/photos/14008893/pexels-photo-14008893.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Flux / 05',
    tag: 'Statement',
    span: 'sm',
  },
  {
    id: 'l6',
    image:
      'https://images.pexels.com/photos/23911184/pexels-photo-23911184.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Drift / 06',
    tag: 'Essentials',
    span: 'sm',
  },
];

export default function Lookbook() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger reveal
      gsap.from('.look-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Parallax on images
      gsap.utils.toArray<HTMLElement>('.look-image').forEach((img) => {
        gsap.to(img, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lookbook"
      className="relative w-full overflow-hidden bg-void-500 py-24 sm:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-neon-500/5 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-neon-400 to-transparent" />
              <span className="font-mono text-xs uppercase tracking-widest text-neon-300">
                Lookbook
              </span>
            </div>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              FW/26 <span className="text-gradient">Visions</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Six silhouettes engineered for the post-digital era. Each piece
            tells a story of material, motion, and light.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              className={`look-card group relative overflow-hidden rounded-2xl border border-white/5 ${
                look.span === 'lg'
                  ? 'aspect-[3/4] sm:aspect-[4/5]'
                  : 'aspect-[3/4]'
              } ${look.span === 'lg' ? 'lg:row-span-2' : ''}`}
            >
              {/* Image with parallax wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={look.image}
                  alt={look.title}
                  className="look-image h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void-500 via-void-500/20 to-transparent transition-opacity duration-500 group-hover:from-void-500/90" />

              {/* Glow border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-electric-500/0 transition-all duration-500 group-hover:border-electric-500/40 group-hover:shadow-glow-mixed" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-1 font-mono text-xs uppercase tracking-widest text-electric-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {look.tag}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {look.title}
                </h3>
              </div>

              {/* Corner accent */}
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-void-500/40 backdrop-blur-sm transition-all duration-500 group-hover:border-electric-500/40">
                <div className="h-2 w-2 rounded-full bg-electric-400/0 transition-all duration-500 group-hover:bg-electric-400 group-hover:shadow-glow-electric" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
