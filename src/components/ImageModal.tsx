"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  rounded?: boolean;
  onClose: () => void;
}

export default function ImageModal({ src, alt, rounded = false, onClose }: ImageModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
      onClick={onClose}
    >
      <div
        className={`relative w-80 h-80 sm:w-[440px] sm:h-[440px] shadow-2xl overflow-hidden ring-4 ring-white/20 ${rounded ? "rounded-full" : "rounded-2xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/25 text-white p-2 rounded-full transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
