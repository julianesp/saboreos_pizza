"use client";

import { Pizza, Sandwich, Cake, Coffee, IceCream, Wine, ChevronRight, ChevronLeft, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { createCategoryMessage } from "../utils/whatsapp";
import { useRef, useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  emoji: string;
  icon: React.ReactNode;
  action: "whatsapp" | "scroll";
}

const categories: Category[] = [
  { id: "pizzas",       name: "Pizzas",               emoji: "🍕", icon: <Pizza className="h-5 w-5" />,          action: "whatsapp" },
  { id: "pollo-champi", name: "Pollo con Champiñones", emoji: "🍗", icon: <Sandwich className="h-5 w-5" />,       action: "whatsapp" },
  { id: "pollo-jamon",  name: "Pollo con Jamón",       emoji: "🍗", icon: <IceCream className="h-5 w-5" />,       action: "whatsapp" },
  { id: "sandwich",     name: "Sándwich Cubano",       emoji: "🥖", icon: <Sandwich className="h-5 w-5" />,       action: "whatsapp" },
  { id: "carnes",       name: "Carnes",                emoji: "🥩", icon: <Coffee className="h-5 w-5" />,         action: "whatsapp" },
  { id: "mazorcada",    name: "Mazorcada",             emoji: "🌽", icon: <Cake className="h-5 w-5" />,           action: "whatsapp" },
  { id: "salchipapa",   name: "Salchipapa",            emoji: "🍟", icon: <Wine className="h-5 w-5" />,           action: "whatsapp" },
  { id: "hamburguesas", name: "Hamburguesas",          emoji: "🍔", icon: <Wine className="h-5 w-5" />,           action: "whatsapp" },
  { id: "lasana",       name: "Lasaña",                emoji: "🍝", icon: <Wine className="h-5 w-5" />,           action: "whatsapp" },
  { id: "gaseosa",      name: "Gaseosa",               emoji: "🥤", icon: <Wine className="h-5 w-5" />,           action: "whatsapp" },
  { id: "menu-digital", name: "Menú Digital",          emoji: "🍽️", icon: <UtensilsCrossed className="h-5 w-5" />, action: "scroll"   },
  { id: "resenas",      name: "Reseñas",               emoji: "⭐", icon: <Star className="h-5 w-5" />,           action: "scroll"   },
  { id: "sedes",        name: "Sedes",                 emoji: "📍", icon: <MapPin className="h-5 w-5" />,         action: "scroll"   },
];

export default function MenuCategoriesBar() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const handleCategoryClick = (category: Category) => {
    if (category.action === "whatsapp") {
      window.open(createCategoryMessage(category.name, category.emoji), "_blank", "noopener,noreferrer");
      return;
    }
    // scroll
    const element = document.getElementById(category.id);
    if (element) {
      const offsetPosition = element.offsetTop - 120;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="w-full bg-white border-b shadow-sm z-30 relative">
      <div className="max-w-7xl mx-auto px-4 py-3 relative">
        {/* Botón izquierdo */}
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-[#029264] hover:text-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {/* Contenedor de categorías */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center justify-start gap-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#029264] text-white hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 whitespace-nowrap border border-transparent hover:border-emerald-200 flex-shrink-0"
            >
              {category.icon}
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Botón derecho */}
        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-[#029264] hover:text-white text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
