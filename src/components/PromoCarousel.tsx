"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface PromoImage {
  src: string;
  alt: string;
  name?: string;
  description?: string;
  price?: string;
}

interface PromoCarouselProps {
  images: PromoImage[];
  autoplayInterval?: number;
  whatsappBase: string;
}

function buildWhatsAppLink(base: string, item: PromoImage): string {
  if (!item.name) return base;
  const text = item.price
    ? `¡Hola! Me interesa ordenar *${item.name}* (${item.price}). ¿Podrían ayudarme con el pedido?`
    : `¡Hola! Me interesa *${item.name}*. ¿Podrían ayudarme con el pedido?`;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export default function PromoCarousel({
  images,
  autoplayInterval = 5000,
  whatsappBase,
}: PromoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = useCallback(
    (index: number) => setCurrent((index + images.length) % images.length),
    [images.length]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    clearTimer();
    if (isPlaying) {
      timerRef.current = setTimeout(
        () => setCurrent((prev) => (prev + 1) % images.length),
        autoplayInterval
      );
    }
    return clearTimer;
  }, [current, isPlaying, autoplayInterval, images.length]);

  const img = images[current];
  const infoOnRight = current % 2 === 0;

  // Shared dots
  const Dots = () => (
    <div className="flex justify-center flex-wrap gap-1.5 mt-3">
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
            i === current
              ? "bg-emerald-600 scale-125"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Ir a imagen ${i + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full select-none">

      {/* ── Desktop layout (≥768px) ── */}
      <div
        className={`hidden md:flex items-stretch overflow-hidden bg-black min-h-[480px] ${
          infoOnRight ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Image side */}
        <div className="relative flex-1">
          {images.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="(max-width: 1200px) 60vw, 50vw"
              />
            </div>
          ))}

          {/* Prev / Next */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="absolute bottom-3 right-3 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
            aria-label={isPlaying ? "Pausar" : "Reanudar"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>

        {/* Info panel */}
        <div className="w-72 xl:w-80 shrink-0 bg-white dark:bg-gray-900 flex flex-col justify-center gap-4 px-8 py-10">
          {img.name ? (
            <>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                {img.name}
              </h3>
              {img.description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {img.description}
                </p>
              )}
              {img.price && (
                <span
                  className="text-3xl font-extrabold text-yellow-500"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,.3)" }}
                >
                  {img.price}
                </span>
              )}
              <Link
                href={buildWhatsAppLink(whatsappBase, img)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-[#029264] hover:bg-[#027a54] text-white text-center font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Pedir por WhatsApp
              </Link>
            </>
          ) : (
            <p className="text-gray-400 text-sm italic">Sin información disponible</p>
          )}
        </div>
      </div>

      {/* Desktop dots — below the whole card */}
      <div className="hidden md:block">
        <Dots />
      </div>

      {/* ── Mobile layout (<768px) ── */}
      <div className="md:hidden relative w-full overflow-hidden rounded-2xl shadow-xl aspect-video bg-black">
        {images.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={togglePlay}
          className="absolute bottom-3 right-3 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all cursor-pointer"
          aria-label={isPlaying ? "Pausar" : "Reanudar"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Mobile info overlay */}
        {img.name && (
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-black/80 to-transparent px-4 py-4">
            <p className="text-white font-bold text-lg leading-tight">{img.name}</p>
            {img.price && (
              <p className="text-yellow-400 font-bold text-base">{img.price}</p>
            )}
            <Link
              href={buildWhatsAppLink(whatsappBase, img)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-[#029264] text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Pedir por WhatsApp
            </Link>
          </div>
        )}
      </div>

      {/* Mobile dots — below the image */}
      <div className="md:hidden">
        <Dots />
      </div>
    </div>
  );
}
