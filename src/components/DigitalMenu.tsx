"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createDetailedOrderMessage } from "../utils/whatsapp";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuCategory {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: "pizzas",
    label: "Pizzas",
    emoji: "🍕",
    items: [
      { id: 1,  name: "Hawaiana",               description: "Jamón y piña caramelizada. Desde $25.000 (Pequeña 26cm) · $35.000 (Mediana 35cm) · $45.000 (Grande 40cm) · $55.000 (Familiar 50cm)", price: "Desde $25.000", image: "/images/pizza_1.jpg" },
      { id: 2,  name: "Pepperoni",               description: "Clásica y deliciosa. Desde $25.000 (Pequeña 26cm) · $35.000 (Mediana 35cm) · $45.000 (Grande 40cm) · $55.000 (Familiar 50cm)",       price: "Desde $25.000", image: "/images/pizza_2.jpg" },
      { id: 3,  name: "Pollo con Champiñones",   description: "Cremosa y sabrosa. Desde $25.000 (Pequeña 26cm) · $35.000 (Mediana 35cm) · $45.000 (Grande 40cm) · $55.000 (Familiar 50cm)",          price: "Desde $25.000", image: "/images/pizza_3.jpg" },
      { id: 4,  name: "Pollo y Jamón",           description: "Una combinación suave y tradicional. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",            price: "Desde $25.000", image: "/images/pizza_4.jpg" },
      { id: 5,  name: "Pollo y Piña",            description: "El balance perfecto entre dulce y salado. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",       price: "Desde $25.000", image: "/images/pizza_5.jpg" },
      { id: 6,  name: "Carnes Mixtas",           description: "Res, pollo desmechado, jamón y salchicha. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",       price: "Desde $25.000", image: "/images/pizza_6.jpg" },
      { id: 7,  name: "Pollo y Maíz",            description: "Suavecita y dorada. Desde $25.000 (Pequeña 26cm) · $35.000 (Mediana 35cm) · $45.000 (Grande 40cm) · $55.000 (Familiar 50cm)",         price: "Desde $25.000", image: "/images/pizza_1.jpg" },
      { id: 8,  name: "Tocineta con Maíz",       description: "Crocante y deliciosa. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",                           price: "Desde $25.000", image: "/images/pizza_2.jpg" },
      { id: 9,  name: "Chorizo, Salchicha y Jamón", description: "Bien cargada de sabor. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",                      price: "Desde $25.000", image: "/images/pizza_3.jpg" },
      { id: 10, name: "Vegetariana",             description: "Tomate, cebolla, maíz, champiñones y pimentón. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",  price: "Desde $25.000", image: "/images/pizza_4.jpg" },
      { id: 11, name: "Mexicana (Picante) 🌶️",  description: "Carne molida, ají, maíz y pimentón rojo. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",        price: "Desde $25.000", image: "/images/pizza_5.jpg" },
      { id: 12, name: "Napolitana",              description: "Tomates frescos con finas hierbas. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",               price: "Desde $25.000", image: "/images/pizza_6.jpg" },
      { id: 13, name: "Tropical",               description: "Durazno, cereza, piña y uvas pasas. Desde $25.000 (Pequeña) · $35.000 (Mediana) · $45.000 (Grande) · $55.000 (Familiar)",              price: "Desde $25.000", image: "/images/pizza_1.jpg" },
    ],
  },
  {
    id: "lasana",
    label: "Lasaña",
    emoji: "🍝",
    items: [
      { id: 1, name: "Lasaña de Carne", description: "Capas de pasta, carne molida, salsa bechamel y queso gratinado", price: "$22.000", image: "/images/comidas_1.jpg" },
      { id: 2, name: "Lasaña de Pollo", description: "Pollo desmenuzado, champiñones, bechamel y queso fundido", price: "$22.000", image: "/images/comidas_2.jpg" },
      { id: 3, name: "Lasaña Mixta", description: "Combinación de carne y pollo con salsa de tomate casera", price: "$24.000", image: "/images/comidas_3.jpg" },
    ],
  },
  {
    id: "hamburguesas",
    label: "Hamburguesas",
    emoji: "🍔",
    items: [
      { id: 1, name: "Hamburguesa Clásica", description: "Res, lechuga, tomate, cebolla y salsa especial", price: "$18.000", image: "/images/comidas_1.jpg" },
      { id: 2, name: "Hamburguesa BBQ", description: "Doble res, bacon, queso cheddar y salsa BBQ ahumada", price: "$24.000", image: "/images/comidas_2.jpg" },
      { id: 3, name: "Hamburguesa de Pollo", description: "Pechuga a la plancha, aguacate, tomate y mayonesa", price: "$20.000", image: "/images/comidas_3.jpg" },
    ],
  },
  {
    id: "alitas",
    label: "Alitas",
    emoji: "🍗",
    items: [
      { id: 1, name: "Alitas BBQ (6 uds)", description: "Alitas crujientes bañadas en salsa BBQ con papas fritas", price: "$22.000", image: "/images/comidas_4.jpg" },
      { id: 2, name: "Alitas Picantes (6 uds)", description: "Alitas con salsa buffalo picante, apio y aderezo ranch", price: "$22.000", image: "/images/comidas_1.jpg" },
      { id: 3, name: "Alitas Mixtas (12 uds)", description: "6 BBQ + 6 picantes con papas y salsas a elección", price: "$38.000", image: "/images/comidas_2.jpg" },
    ],
  },
  {
    id: "mazorcadas",
    label: "Mazorcadas",
    emoji: "🌽",
    items: [
      { id: 1, name: "Mazorcada Clásica", description: "Mazorca desgranada con crema, queso y mantequilla", price: "$12.000", image: "/images/comidas_3.jpg" },
      { id: 2, name: "Mazorcada con Pollo", description: "Mazorca con pollo desmenuzado, crema y queso gratinado", price: "$18.000", image: "/images/comidas_4.jpg" },
      { id: 3, name: "Mazorcada Especial", description: "Mazorca con chorizo, tocino, crema y doble queso", price: "$20.000", image: "/images/comidas_1.jpg" },
    ],
  },
  {
    id: "sandwich",
    label: "Sándwich Cubano",
    emoji: "🥖",
    items: [
      { id: 1, name: "Cubano Clásico", description: "Jamón, cerdo, queso suizo, pepinillos y mostaza en pan crujiente", price: "$18.000", image: "/images/comidas_2.jpg" },
      { id: 2, name: "Cubano Especial", description: "Doble jamón, pollo, queso, aguacate y salsa de la casa", price: "$22.000", image: "/images/comidas_3.jpg" },
    ],
  },
  {
    id: "carta",
    label: "Platos a la Carta",
    emoji: "🍽️",
    items: [
      { id: 1, name: "Bandeja Regional", description: "Arroz, fríjoles, carne, chicharrón, huevo y aguacate", price: "$22.000", image: "/images/comidas_4.jpg" },
      { id: 2, name: "Pollo con Champiñones", description: "Pechuga a la plancha con salsa de champiñones y arroz", price: "$24.000", image: "/images/comidas_1.jpg" },
      { id: 3, name: "Salchipapa Especial", description: "Papas fritas con salchicha, queso derretido y salsas", price: "$14.000", image: "/images/comidas_2.jpg" },
      { id: 4, name: "Recepción / Pedido Especial", description: "Menú personalizado para eventos. Consulta disponibilidad", price: "Consultar", image: "/images/comidas_3.jpg" },
    ],
  },
];

/* ── Desktop card (unchanged) ── */
function DesktopCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden flex flex-col">
      <div className="relative h-44 w-full">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="33vw" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h5 className="font-bold text-gray-900 mb-1">{item.name}</h5>
        <p className="text-sm text-gray-500 mb-3 flex-1">{item.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-yellow-500" style={{ textShadow: "0 0 2px #00000066" }}>
            {item.price}
          </span>
          <Link
            href={item.price !== "Consultar"
              ? createDetailedOrderMessage(item.name, item.description, item.price, `https://saboreospizza.com${item.image}`)
              : "https://wa.me/3123946614?text=Hola%2C%20me%20interesa%20un%20pedido%20especial"}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#029264] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#027a54] transition-colors"
          >
            {item.price !== "Consultar" ? "Pedir" : "Consultar"}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile 3-D carousel ── */
// Each card slot has a fixed logical position: -1 (prev), 0 (center), +1 (next)
// When navigating we shift the offset so cards glide into new positions.
function MobileCarousel({ items }: { items: MenuItem[] }) {
  const [current, setCurrent] = useState(0);
  // offset drives the whole track: 0 = resting, ±1 = mid-animation
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    // shift track in the correct direction
    setOffset(dir === "right" ? -1 : 1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // commit new index, snap track back without transition
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % items.length
          : (prev - 1 + items.length) % items.length
      );
      setOffset(0);
      setIsAnimating(false);
    }, 380);
  }, [isAnimating, items.length]);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const prevIdx = (current - 1 + items.length) % items.length;
  const nextIdx = (current + 1) % items.length;

  // Slots: prev(-1), center(0), next(1), plus ghost slots for the entering card
  type Slot = { item: MenuItem; slot: number };
  const slots: Slot[] = [
    { item: items[prevIdx],  slot: -1 },
    { item: items[current],  slot:  0 },
    { item: items[nextIdx],  slot:  1 },
    // ghost cards that slide in from outside during animation
    { item: items[(current - 2 + items.length) % items.length], slot: -2 },
    { item: items[(current + 2) % items.length],                 slot:  2 },
  ];

  const styleForSlot = (slot: number) => {
    const shifted = slot + offset;
    // position map: slot → x%, scale, opacity, z
    const xPct  = shifted * 62;
    const abs   = Math.abs(shifted);
    const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.62;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0;
    const z     = abs === 0 ? 20 : abs === 1 ? 10 : 0;

    return {
      transform: `translateX(${xPct}%) scale(${scale})`,
      opacity,
      zIndex: z,
      transition: offset !== 0
        ? "transform 380ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease"
        : "none",
    };
  };

  const center = items[current];
  // animate info panel on change
  const [infoKey, setInfoKey] = useState(current);
  useEffect(() => {
    const t = setTimeout(() => setInfoKey(current), 200);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div className="relative w-full select-none">
      {/* Cards stage */}
      <div className="relative h-72 flex items-center justify-center overflow-hidden">
        {slots.map(({ item, slot }) => (
          <div
            key={`${slot}-${item.id}`}
            className="absolute w-[72%] h-64 rounded-2xl overflow-hidden shadow-2xl"
            style={styleForSlot(slot)}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="80vw"
              priority={slot === 0}
            />
            {/* dark overlay on non-center cards */}
            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-300"
              style={{ backgroundColor: "rgba(0,0,0,0.35)", opacity: slot === 0 ? 0 : 1 }}
            />
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => go("left")}
          disabled={isAnimating}
          className="absolute left-2 z-30 bg-black/50 hover:bg-black/70 active:scale-90 text-white p-2.5 rounded-full transition-all cursor-pointer disabled:opacity-40"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go("right")}
          disabled={isAnimating}
          className="absolute right-2 z-30 bg-black/50 hover:bg-black/70 active:scale-90 text-white p-2.5 rounded-full transition-all cursor-pointer disabled:opacity-40"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Info panel — slides up on change */}
      <div
        key={infoKey}
        className="mx-auto w-[72%] bg-white rounded-2xl shadow-lg px-4 py-3 -mt-3 relative z-20 flex flex-col gap-1"
        style={{ animation: "slideUpFade 320ms cubic-bezier(0.34,1.4,0.64,1) both" }}
      >
        <h5 className="font-bold text-gray-900 text-base leading-tight">{center.name}</h5>
        <p className="text-xs text-gray-500 leading-snug line-clamp-2">{center.description}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-lg font-extrabold text-yellow-500" style={{ textShadow: "0 0 2px #00000055" }}>
            {center.price}
          </span>
          <Link
            href={center.price !== "Consultar"
              ? createDetailedOrderMessage(center.name, center.description, center.price, `https://saboreospizza.com${center.image}`)
              : "https://wa.me/3123946614?text=Hola%2C%20me%20interesa%20un%20pedido%20especial"}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#029264] hover:bg-[#027a54] active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
          >
            {center.price !== "Consultar" ? "Pedir" : "Consultar"}
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating || i === current) return;
              // determine direction by shortest path
              const diff = (i - current + items.length) % items.length;
              go(diff <= items.length / 2 ? "right" : "left");
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "bg-[#029264] w-5 h-2"
                : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
            }`}
            aria-label={`Ir a ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function DigitalMenu() {
  const [activeCategory, setActiveCategory] = useState("pizzas");
  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu-digital" className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">🍽️ Menú Digital</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestras categorías y haz tu pedido directo por WhatsApp
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#029264] text-white border-[#029264] shadow-md"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile: 3-D carousel */}
        <div className="md:hidden">
          <MobileCarousel key={activeCategory} items={currentCategory.items} />
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((item) => (
            <DesktopCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
