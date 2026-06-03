"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { generalWhatsAppMessage } from "../utils/whatsapp";
import Link from "next/link";
import styles from "../styles/NavBar.module.scss";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuDiscovered, setMenuDiscovered] = useState(true); // true = sin pulso hasta que cargue
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setMenuDiscovered(!!localStorage.getItem("saboreos-menu-discovered"));
  }, []);

  const handleMenuToggle = () => {
    if (!menuDiscovered) {
      setMenuDiscovered(true);
      localStorage.setItem("saboreos-menu-discovered", "1");
    }
    setIsMobileMenuOpen((prev) => !prev);
  };
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cerrar menú al hacer clic fuera
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent | ToggleEvent) => {
  //     if (navRef.current && !navRef.current.contains(event.target as Node)) {
  //       setIsMobileMenuOpen(false);
  //     }
  //   };

  //   if (isMobileMenuOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     document.addEventListener("touchstart", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  // }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside as EventListener,
      );
      document.addEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener,
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    };
  }, [isMobileMenuOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 130; // navbar (~56px) + barra categorías (~52px) + margen

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

      // Zumbido al llegar al destino
      setTimeout(() => {
        element.classList.add("buzz");
        element.addEventListener(
          "animationend",
          () => element.classList.remove("buzz"),
          { once: true },
        );
      }, duration);
    }
  };
  return (
    <>
      <nav
        ref={navRef}
        className={`z-40 fixed w-full h-14 backdrop-blur-md bg-white/60 ${styles.navbar}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-10">
          <div
            className={`flex justify-items items-center h-16 max-[768px]:justify-center max-[768px]:relative ${styles.navContainer}`}
          >
            {/* Mobile Layout: Saboreos - Logo - Pizza */}
            <div className="hidden max-[768px]:grid max-[768px]:grid-cols-3 max-[768px]:w-full max-[768px]:items-center">
              <h1 className="text-xl font-bold text-gray-900 max-[768px]:text-center">
                Saboreos
              </h1>

              <div className="max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center max-[768px]:relative mt-6">
                <Image
                  src="https://media.saboreospizza.com/logo.jpg"
                  alt="logo"
                  width={50}
                  height={50}
                  className="rounded-full bg-white transition-transform duration-700 ease-in-out hover:rotate-[360deg]"
                />

                {/* Botón menú móvil */}
                <div className="max-[768px]:block hidden mt-1">
                  <button
                    onClick={handleMenuToggle}
                    aria-label="Toggle mobile menu"
                    className={`
                    relative flex items-center gap-1.5 rounded-full
                    text-white font-semibold tracking-wide
                    shadow-lg transition-all duration-300 active:scale-95 translate-y-3
                    bg-[#029264] hover:bg-[#027a54]
                    ${isMobileMenuOpen ? "p-2.5" : "px-3 py-1 text-sm"}
                    ${!isMobileMenuOpen && !menuDiscovered ? "animate-pulse-slow" : ""}
                  `}
                  >
                    {isMobileMenuOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    ) : (
                      <>
                        <span>Menú</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                    {/* Halo de ping solo si el usuario aún no ha descubierto el menú */}
                    {!isMobileMenuOpen && !menuDiscovered && (
                      <span className="absolute inset-0 rounded-full bg-[#029264] opacity-40 animate-ping-slow" />
                    )}
                  </button>
                </div>
              </div>

              <h1 className="text-xl font-bold text-gray-900 max-[768px]:text-center">
                Pizza
              </h1>
            </div>

            {/* Desktop Layout: Logo + Full Text a la izquierda */}
            <div
              className={`flex items-center space-x-2 max-[768px]:hidden min-[769px]:max-[1023px]:justify-center min-[769px]:max-[1023px]:w-full ${styles.logoSection}`}
            >
              <Image
                src="https://media.saboreospizza.com/logo.jpg"
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
              <h1 className="text-2xl font-bold text-gray-900">
                Saboreos Pizza
              </h1>
            </div>

            {/* Navigation Links a la derecha */}
            <div
              className={`hidden min-[769px]:flex items-center space-x-6 min-[769px]:max-[1023px]:hidden ${styles.navigationLinks}`}
            >
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
                href="#sedes"
                onClick={(e) => handleSmoothScroll(e, "sedes")}
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Sedes
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleSmoothScroll(e, "contacto")}
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Contacto
              </a>
              <button
                onClick={toggle}
                aria-label="Cambiar tema"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-500"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <a
                href={generalWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#029264] text-white px-4 py-2 rounded-lg hover:bg-[#027a54] transition-colors"
              >
                Pedir Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu — fuera del <nav> para que el click-outside funcione */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed left-0 right-0 top-14 bottom-0 z-30 flex flex-col bg-white/0 backdrop-blur-md overflow-y-auto">
          <nav className="flex flex-col items-center justify-center gap-4 px-8 py-10 flex-1">
            {[
              { id: "inicio", label: "Inicio", emoji: "🏠" },
              { id: "especialidades", label: "Especialidades", emoji: "🍕" },
              { id: "menu-digital", label: "Menú Digital", emoji: "📋" },
              { id: "sedes", label: "Sedes", emoji: "📍" },
              { id: "contacto", label: "Contacto", emoji: "📞" },
            ].map(({ id, label, emoji }, i) => (
              <Link
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-gray-800 font-semibold text-lg border border-gray-100 shadow-sm bg-white hover:bg-[#029264] hover:text-white hover:border-[#029264] active:scale-[0.97] transition-all duration-200"
              >
                <span className="text-2xl">{emoji}</span>
                {label}
                <ChevronDown className="ml-auto h-4 w-4 -rotate-90 opacity-40" />
              </Link>
            ))}

            <Link
              href={generalWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#029264] hover:bg-[#027a54] text-white font-bold text-lg shadow-lg active:scale-[0.97] transition-all duration-200"
            >
              🛒 Pedir Ahora
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
