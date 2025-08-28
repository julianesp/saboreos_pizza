"use client";

import Image from "next/image";
import { generalWhatsAppMessage } from "../utils/whatsapp";

const Navbar = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // Ajuste para el navbar fijo
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Agregar impulso de velocidad
      const startTime = performance.now();
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.min(800, Math.abs(distance) * 0.8); // Duración más rápida
      
      function easeInOutQuart(t: number): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      }
      
      function animateScroll(currentTime: number) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutQuart(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      }
      
      requestAnimationFrame(animateScroll);
    }
  };
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 ">
            <Image
              src="https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/logo_saboreos.png"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full bg-white transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
            />
            {/* gotas de queso */}
            <span
              className="
    absolute left-1/2 top-full h-3 w-2 
    rounded-full bg-yellow-400 opacity-0 
    group-hover:opacity-100 group-hover:animate-bounce
    -translate-x-1/2
  "
            />
            <span
              className="
    absolute left-1/3 top-full h-2 w-1.5 
    rounded-full bg-yellow-300 opacity-0 
    group-hover:opacity-100 group-hover:animate-bounce
    -translate-x-1/2 delay-150
  "
            />
            <h1 className="text-2xl font-bold text-gray-900">Saboreos Pizza</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#inicio"
              onClick={(e) => handleSmoothScroll(e, 'inicio')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#especialidades"
              onClick={(e) => handleSmoothScroll(e, 'especialidades')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Especialidades
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleSmoothScroll(e, 'contacto')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Contacto
            </a>
            <a
              href={generalWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Pedir Ahora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
