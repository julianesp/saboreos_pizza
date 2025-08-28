"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { generalWhatsAppMessage } from "../utils/whatsapp";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80; // Ajuste para el navbar fijo

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Agregar impulso de velocidad
      const startTime = performance.now();
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = Math.min(800, Math.abs(distance) * 0.8); // Duración más rápida

      function easeInOutQuart(t: number): number {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
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
    <nav className="bg-white shadow-lg top-0 z-10 relative">
      {/* circulo para flecha despliega links */}
      {/* <div className="w-12 h-12 bg-white absolute left-1/2 top-12 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"></div> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-10">
        <div className="flex justify-items items-center h-16 max-[425px]:justify-center max-[425px]:relative">
          {/* Mobile Layout: Saboreos - Logo - Pizza */}
          <div className="hidden max-[425px]:grid max-[425px]:grid-cols-3 max-[425px]:w-full max-[425px]:items-center">
            <h1 className="text-xl font-bold text-gray-900 max-[425px]:text-center">
              Saboreos
            </h1>
            <div className="max-[425px]:flex max-[425px]:flex-col max-[425px]:items-center max-[425px]:relative mt-12">
              <Image
                src="https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/logo_saboreos.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full bg-white transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
              />
              {/* Arrow Button for Mobile Menu */}
              <button
                onClick={toggleMobileMenu}
                className="max-[425px]:block hidden p-1 mb-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900 max-[425px]:text-center">
              Pizza
            </h1>
            c{" "}
          </div>

          {/* Desktop Layout: Logo + Full Text */}
          <div className="flex items-center space-x-2 max-[425px]:hidden">
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
              onClick={(e) => handleSmoothScroll(e, "inicio")}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#especialidades"
              onClick={(e) => handleSmoothScroll(e, "especialidades")}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Especialidades
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleSmoothScroll(e, "contacto")}
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

      {/* Mobile Dropdown Menu - Absolute Overlay */}
      <div
        className={`max-[425px]:block hidden absolute top-full left-0 right-0 z-40 transition-all duration-300 ease-in-out mt-8 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center bg-white/75 backdrop-opacity-0 shadow-xl border-b  ">
          <div className="py-6 px-6">
            {/* First Row - Navigation Links */}
            <div className="flex justify-center space-x-8 mb-4 ">
              <Link
                href="#inicio"
                onClick={(e) => {
                  handleSmoothScroll(e, "inicio");
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link
                href="#especialidades"
                onClick={(e) => {
                  handleSmoothScroll(e, "especialidades");
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
              >
                Especialidades
              </Link>
              <Link
                href="#contacto"
                onClick={(e) => {
                  handleSmoothScroll(e, "contacto");
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
              >
                Contacto
              </Link>
            </div>

            {/* Second Row - CTA Button */}
            <div className="flex justify-center">
              <Link
                href={generalWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-lg"
              >
                Pedir Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
