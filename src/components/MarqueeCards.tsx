"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export interface MarqueeItem {
  label: string;
  labelColor: string;
  bg: string;
  border: string;
  image: string;
  name: string;
  description: string;
  price: string;
  whatsappHref: string;
  badge?: { text: string; side: "left" | "right" };
}

interface MarqueeCardsProps {
  items: MarqueeItem[];
  speed?: number; // px/s
}

const CARD_W = 220;   // card width px
const CARD_GAP = 16;  // gap px
const STRIDE = CARD_W + CARD_GAP;

export default function MarqueeCards({ items, speed = 60 }: MarqueeCardsProps) {
  // Duplicate items so the belt is always full even after wrapping
  const belt = [...items, ...items, ...items];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  // Start offset: center the visible cards inside the container
  const posRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  // Per-card: 0 = normal, 1 = sinking (at right edge)
  const [sinkIdx, setSinkIdx] = useState<Set<number>>(new Set());

  const totalW = belt.length * STRIDE;
  // We loop when we've scrolled one full copy (items.length * STRIDE)
  const loopAt = items.length * STRIDE;

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Start from position 0 — first card flush with left edge, belt flows left
    if (posRef.current === null) {
      posRef.current = 0;
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!pausedRef.current) {
        posRef.current! -= speed * dt;
        // Loop seamlessly after scrolling one full copy
        if (posRef.current! <= -loopAt) {
          posRef.current! += loopAt;
        }
      }

      track.style.transform = `translateX(${posRef.current}px)`;

      // Detect which cards are near the right edge and mark them sinking
      const containerW = container.clientWidth;
      const newSink = new Set<number>();
      belt.forEach((_, i) => {
        const cardLeft = posRef.current! + i * STRIDE;
        const cardRight = cardLeft + CARD_W;
        // "sinking zone": last 60px before exiting on the right
        if (cardRight > containerW - 60 && cardLeft < containerW + 10) {
          newSink.add(i);
        }
      });
      setSinkIdx(newSink);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [belt.length, loopAt, speed, totalW]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; lastTsRef.current = null; }}
    >
      {/* Left fade mask */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10
                      bg-linear-to-r from-[#029264] to-transparent" />
      {/* Right fade mask */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10
                      bg-linear-to-l from-[#029264] to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ width: `${totalW}px` }}
      >
        {belt.map((item, i) => {
          const sinking = sinkIdx.has(i);
          return (
            <div
              key={i}
              style={{ width: `${CARD_W}px`, minWidth: `${CARD_W}px` }}
              className={`
                relative flex flex-col items-center text-center p-4 gap-2
                rounded-2xl border shadow-md backdrop-blur-sm
                transition-all duration-300 ease-in-out
                ${item.bg} ${item.border}
                ${sinking
                  ? "scale-75 opacity-30 -translate-y-2"
                  : "scale-100 opacity-100 translate-y-0"}
              `}
            >
              {item.badge && (
                <div
                  className={`absolute top-2 ${item.badge.side === "right" ? "right-2 rotate-6" : "left-2"} bg-[#029264] text-white px-2 py-0.5 rounded-full font-bold text-xs shadow`}
                >
                  {item.badge.text}
                </div>
              )}

              <p className={`text-xs font-semibold uppercase tracking-wide ${item.labelColor}`}>
                {item.label}
              </p>

              <div className="w-20 h-20 shrink-0 relative rounded-full overflow-hidden shadow-md">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-1">
                {item.name}
              </h4>
              <p className="text-gray-500 text-xs leading-snug line-clamp-2 flex-1">
                {item.description}
              </p>
              <span
                className="text-lg font-extrabold text-yellow-500"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,.25)" }}
              >
                {item.price}
              </span>
              <Link
                href={item.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-[#029264] hover:bg-[#027a54] text-white text-xs font-semibold px-2 py-2 rounded-lg transition-colors"
              >
                Pedir por WhatsApp
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
