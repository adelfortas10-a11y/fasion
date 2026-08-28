'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Change this single variable to set the number of 360° frames ──
const TOTAL_FRAMES = 120;
const FRAME_PATH = '/product-sequence/frame-';
const FRAME_EXT = '.webp';
const BATCH_SIZE = 20;

// Pad number to 3 digits: 1 -> "001"
function pad(n: number) {
  return String(n).padStart(3, '0');
}

function frameUrl(i: number) {
  return `${FRAME_PATH}${pad(i)}${FRAME_EXT}`;
}

interface PinPoint {
  id: string;
  frame: number; // 0-indexed
  title: string;
  description: string;
}

const PIN_POINTS: PinPoint[] = [
  {
    id: 'pp1',
    frame: 20,
    title: 'Smart Fabric',
    description:
      'Nano-woven threads adapt to body temperature, regulating heat in real time.',
  },
  {
    id: 'pp2',
    frame: 55,
    title: 'Seamless Construction',
    description:
      'Ultrasonic bonding eliminates traditional stitching for a frictionless fit.',
  },
  {
    id: 'pp3',
    frame: 90,
    title: 'Reactive Finish',
    description:
      'A photochromic coating shifts tone under UV light — your garment, your signal.',
  },
];

export default function ProductScroller() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activePin, setActivePin] = useState<PinPoint | null>(null);

  // ── Batch preload images ──
  const preload = useCallback(async () => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let start = 1; start <= TOTAL_FRAMES; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE - 1, TOTAL_FRAMES);
      const batch: Promise<void>[] = [];

      for (let i = start; i <= end; i++) {
        const idx = i - 1;
        batch.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              resolve();
            };
            img.onerror = () => {
              // If image missing, still resolve so loading completes
              loadedCount++;
              setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
              resolve();
            };
            img.src = frameUrl(i);
            images[idx] = img;
          })
        );
      }
      await Promise.all(batch);
    }

    imagesRef.current = images;
    setLoaded(true);
  }, []);

  // ── Draw frame on canvas ──
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    } else {
      // Placeholder: draw a rotating geometric shape
      drawPlaceholder(ctx, canvas, frameIndex);
    }
  }, []);

  // ── Placeholder rendering when images aren't uploaded yet ──
  const drawPlaceholder = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    frameIndex: number
  ) => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const angle = (frameIndex / TOTAL_FRAMES) * Math.PI * 2;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.28;

    // Glow
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5);
    grad.addColorStop(0, 'rgba(0, 229, 255, 0.15)');
    grad.addColorStop(0.5, 'rgba(139, 92, 246, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Rotating garment silhouette (stylized)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle * 0.3);

    const grad2 = ctx.createLinearGradient(0, -radius, 0, radius);
    grad2.addColorStop(0, '#1a1a2e');
    grad2.addColorStop(0.5, '#16213e');
    grad2.addColorStop(1, '#0f0f17');

    ctx.fillStyle = grad2;
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 1.5;

    // Jacket-like shape
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.9);
    ctx.bezierCurveTo(
      -radius * 0.6, -radius * 0.9,
      -radius * 0.7, -radius * 0.3,
      -radius * 0.5, radius * 0.2
    );
    ctx.lineTo(-radius * 0.3, radius * 0.9);
    ctx.lineTo(0, radius * 0.7);
    ctx.lineTo(radius * 0.3, radius * 0.9);
    ctx.lineTo(radius * 0.5, radius * 0.2);
    ctx.bezierCurveTo(
      radius * 0.7, -radius * 0.3,
      radius * 0.6, -radius * 0.9,
      0, -radius * 0.9
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center line
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.85);
    ctx.lineTo(0, radius * 0.7);
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
    ctx.stroke();

    ctx.restore();

    // Frame indicator
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`FRAME ${pad(frameIndex + 1)} / ${TOTAL_FRAMES}`, cx, h - 30);
  };

  // ── Canvas sizing ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Init: preload + set up ScrollTrigger ──
  useEffect(() => {
    preload();
  }, [preload]);

  useEffect(() => {
    if (!loaded) return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const section = sectionRef.current!;
    const canvas = canvasRef.current!;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * 12}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(p * (TOTAL_FRAMES - 1))
        );
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);

        // Glow ring scale based on scroll velocity
        const velocity = Math.abs(self.getVelocity()) / 2000;
        const glow = glowRef.current;
        if (glow) {
          const scale = 1 + Math.min(velocity, 0.3);
          const opacity = 0.4 + Math.min(velocity, 0.5);
          gsap.to(glow, {
            scale,
            opacity,
            duration: 0.4,
            overwrite: true,
          });
        }

        // Check pin points
        const matched = PIN_POINTS.find(
          (pp) => Math.abs(pp.frame - frameIndex) < 4
        );
        setActivePin(matched || null);
      },
    });

    return () => {
      st.kill();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loaded, drawFrame, resizeCanvas]);

  // ── Draw first frame when loaded ──
  useEffect(() => {
    if (loaded) {
      resizeCanvas();
      drawFrame(0);
    }
  }, [loaded, resizeCanvas, drawFrame]);

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/5 blur-[150px]" />

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-void-500">
          <div className="w-full max-w-md px-6">
            <div className="mb-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-electric-300">
              <span>Loading Sequence</span>
              <span className="text-electric-400">{progress}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="loading-bar-fill h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>FRAMES: {TOTAL_FRAMES}</span>
              <span>WEBP / BATCH</span>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-electric-500/20 border-t-electric-400" />
                <div className="absolute inset-2 animate-pulse-glow rounded-full bg-electric-500/10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product canvas + glow */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="relative">
          {/* Glow ring */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="h-[420px] w-[420px] rounded-full border border-electric-500/30 shadow-glow-electric sm:h-[520px] sm:w-[520px]" />
            <div className="absolute inset-4 rounded-full border border-neon-500/20" />
            <div className="absolute inset-8 rounded-full border border-electric-500/10" />
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="relative h-[60vh] max-h-[600px] w-[80vw] max-w-[600px]"
          />

          {/* Pin point indicator */}
          {activePin && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-3 w-3 animate-pulse-glow rounded-full bg-electric-400 shadow-glow-electric" />
              <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electric-400/40" />
            </div>
          )}
        </div>
      </div>

      {/* Pin point text overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="flex justify-between">
            <div className="max-w-xs">
              {activePin && (
                <div key={activePin.id} className="animate-[fadeIn_0.5s_ease]">
                  <div className="mb-2 inline-block rounded-full border border-electric-500/30 bg-electric-500/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-electric-300">
                    Detail {PIN_POINTS.indexOf(activePin) + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {activePin.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activePin.description}
                  </p>
                </div>
              )}
            </div>
            <div className="hidden text-right sm:block">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                360° Scroll
              </div>
              <div className="mt-1 font-display text-4xl font-bold text-gradient">
                {String(currentFrameRef.current + 1).padStart(3, '0')}
                <span className="text-muted-foreground/40">
                  / {TOTAL_FRAMES}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-electric-400 to-neon-400"
          style={{
            width: `${((currentFrameRef.current + 1) / TOTAL_FRAMES) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
