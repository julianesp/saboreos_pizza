'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Facebook, Instagram, Phone, Share2 } from 'lucide-react';

const FloatingFooter = () => {
  const [menuOption, setMenuOptions] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const flechaRef = useRef<HTMLButtonElement>(null);

  const whatsappNumber = "3177694172";
  const facebookUrl = "https://www.facebook.com/saboreospizza";
  const instagramUrl = "https://www.instagram.com/saboreospizza/";

  const switchOptions = () => {
    setMenuOptions(!menuOption);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        flechaRef.current &&
        !flechaRef.current.contains(event.target as Node)
      ) {
        setMenuOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isClient]);

  const createWhatsAppMessage = () => {
    const message = "¡Hola! Me gustaría hacer un pedido de pizza. ¿Podrían ayudarme?";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        ref={flechaRef} 
        onClick={switchOptions}
        className="fixed bottom-4 left-4 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group"
        aria-label="Abrir redes sociales"
      >
        <Share2 className={`h-6 w-6 transition-transform duration-300 ${menuOption ? 'rotate-45' : ''}`} />
        
        {/* Pulse animation when closed */}
        {!menuOption && (
          <div className="absolute inset-0 rounded-full bg-emerald-600 animate-ping opacity-30"></div>
        )}
      </button>

      {/* Social Media Menu */}
      {isClient && (
        <div
          ref={menuRef}
          className={`fixed bottom-20 left-4 z-40 transition-all duration-300 ${
            menuOption 
              ? 'opacity-100 transform translate-y-0 scale-100' 
              : 'opacity-0 transform translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-3">
            {/* WhatsApp */}
            <Link
              href={createWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              title="WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>

            {/* Facebook */}
            <Link
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              title="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </Link>

            {/* Instagram */}
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              title="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>

            {/* Phone */}
            <Link
              href={`tel:+57${whatsappNumber}`}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              title="Llamar"
            >
              <Phone className="h-6 w-6" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingFooter;