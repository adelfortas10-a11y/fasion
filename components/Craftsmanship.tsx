'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DETAILS = [
  {
    id: 'd1',
    image:
      'https://images.pexels.com/photos/4862956/pexels-photo-4862956.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    label: '01 / Fabric',
    title: 'Engineered Weave',
    description:
      'A proprietary nano-weave blends organic cotton with conductive polymer threads, creating a fabric that breathes and responds.',
  },
  {
    id: 'd2',
    image:
      'https://images.pexels.com/photos/4938326/pexels-photo-4938326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    label: '02 / Texture',
    title: 'Tactile Precision',
    description:
      'Every fiber is aligned at the micron level, producing a surface that shifts between matte and sheen as light moves across it.',
  },
  {
    id: 'd3',
    image:
      'https://images.pexels.com/photos/1487809/pexels-photo-1487809.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    label: '03 / Finish',
    title: 'Liquid Coating',
    description:
      'A photochromic liquid finish bonds at the molecular level, protecting the garment while enabling reactive color shifts.',
  },
  {
    id: 'd4',
    image:
      'https://images.pexels.com/photos/7717488/pexels-photo-7717488.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    label: '04 / Drape',
    title: 'Architectural Flow',
    description:
      'Pattern-cut by algorithm, the garment falls with engineered precision — structured in motion, fluid at rest.',
  },
];

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;

    const totalWidth = track.scrollWidth;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const x = -self.progress * totalWidth;
        gsap.to(track, { x, duration: 0.1, ease: 'none', overwrite: true });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative h-screen w-full overflow-hidden bg-void-500"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-void-500 to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-void-500 to-transparent z-10" />

      {/* Section header */}
      <div className="absolute left-0 top-0 z-20 w-full p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-electric-400 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest text-electric-300">
            Craftsmanship
          </span>
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          The <span className="text-gradient">Details</span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div className="flex h-full items-center">
        <div
          ref={trackRef}
          className="flex gap-8 px-6"
          style={{ willChange: 'transform' }}
        >
          {DETAILS.map((detail) => (
            <div
              key={detail.id}
              className="group relative h-[65vh] w-[80vw] flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 sm:w-[60vw] md:w-[45vw] lg:w-[35vw]"
            >
              {/* Image */}
              <img
                src={detail.image}
                alt={detail.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void-500 via-void-500/30 to-transparent" />

              {/* Glow border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-electric-500/0 transition-all duration-500 group-hover:border-electric-500/40 group-hover:shadow-glow-electric" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="mb-2 font-mono text-xs uppercase tracking-widest text-electric-300">
                  {detail.label}
                </div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">
                  {detail.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  {detail.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-electric-500/20 bg-void-500/50 backdrop-blur-sm" />
            </div>
          ))}

          {/* End card */}
          <div className="flex w-[30vw] flex-shrink-0 items-center justify-center">
            <div className="text-center">
              <div className="font-display text-6xl font-bold text-gradient">
                100%
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Crafted in our atelier
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
