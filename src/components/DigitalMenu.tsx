"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createWhatsAppMessage } from "../utils/whatsapp";

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
      {
        id: 1,
        name: "Margarita",
        description: "Salsa de tomate casera, mozzarella y orégano",
        price: "$18.000",
        image: "/images/pizza_1.jpg",
      },
      {
        id: 2,
        name: "Pepperoni",
        description: "Pepperoni, mozzarella y salsa de tomate artesanal",
        price: "$22.000",
        image: "/images/pizza_2.jpg",
      },
      {
        id: 3,
        name: "Hawaiana",
        description: "Jamón, piña, mozzarella y salsa de la casa",
        price: "$25.000",
        image: "/images/pizza_3.jpg",
      },
      {
        id: 4,
        name: "Vegetariana",
        description: "Pimientos, champiñones, cebolla morada y aceitunas",
        price: "$24.000",
        image: "/images/pizza_4.jpg",
      },
      {
        id: 5,
        name: "Carnes",
        description: "Res, pollo, jamón y salchicha con doble queso",
        price: "$28.000",
        image: "/images/pizza_5.jpg",
      },
      {
        id: 6,
        name: "Familiar",
        description: "Grande para compartir, ingredientes a elección",
        price: "$55.000",
        image: "/images/pizza_6.jpg",
      },
    ],
  },
  {
    id: "lasana",
    label: "Lasaña",
    emoji: "🍝",
    items: [
      {
        id: 1,
        name: "Lasaña de Carne",
        description: "Capas de pasta, carne molida, salsa bechamel y queso gratinado",
        price: "$22.000",
        image: "/images/comidas_1.jpg",
      },
      {
        id: 2,
        name: "Lasaña de Pollo",
        description: "Pollo desmenuzado, champiñones, bechamel y queso fundido",
        price: "$22.000",
        image: "/images/comidas_2.jpg",
      },
      {
        id: 3,
        name: "Lasaña Mixta",
        description: "Combinación de carne y pollo con salsa de tomate casera",
        price: "$24.000",
        image: "/images/comidas_3.jpg",
      },
    ],
  },
  {
    id: "hamburguesas",
    label: "Hamburguesas",
    emoji: "🍔",
    items: [
      {
        id: 1,
        name: "Hamburguesa Clásica",
        description: "Res, lechuga, tomate, cebolla y salsa especial",
        price: "$18.000",
        image: "/images/comidas_1.jpg",
      },
      {
        id: 2,
        name: "Hamburguesa BBQ",
        description: "Doble res, bacon, queso cheddar y salsa BBQ ahumada",
        price: "$24.000",
        image: "/images/comidas_2.jpg",
      },
      {
        id: 3,
        name: "Hamburguesa de Pollo",
        description: "Pechuga a la plancha, aguacate, tomate y mayonesa",
        price: "$20.000",
        image: "/images/comidas_3.jpg",
      },
    ],
  },
  {
    id: "alitas",
    label: "Alitas",
    emoji: "🍗",
    items: [
      {
        id: 1,
        name: "Alitas BBQ (6 uds)",
        description: "Alitas crujientes bañadas en salsa BBQ con papas fritas",
        price: "$22.000",
        image: "/images/comidas_4.jpg",
      },
      {
        id: 2,
        name: "Alitas Picantes (6 uds)",
        description: "Alitas con salsa buffalo picante, apio y aderezo ranch",
        price: "$22.000",
        image: "/images/comidas_1.jpg",
      },
      {
        id: 3,
        name: "Alitas Mixtas (12 uds)",
        description: "6 BBQ + 6 picantes con papas y salsas a elección",
        price: "$38.000",
        image: "/images/comidas_2.jpg",
      },
    ],
  },
  {
    id: "mazorcadas",
    label: "Mazorcadas",
    emoji: "🌽",
    items: [
      {
        id: 1,
        name: "Mazorcada Clásica",
        description: "Mazorca desgranada con crema, queso y mantequilla",
        price: "$12.000",
        image: "/images/comidas_3.jpg",
      },
      {
        id: 2,
        name: "Mazorcada con Pollo",
        description: "Mazorca con pollo desmenuzado, crema y queso gratinado",
        price: "$18.000",
        image: "/images/comidas_4.jpg",
      },
      {
        id: 3,
        name: "Mazorcada Especial",
        description: "Mazorca con chorizo, tocino, crema y doble queso",
        price: "$20.000",
        image: "/images/comidas_1.jpg",
      },
    ],
  },
  {
    id: "sandwich",
    label: "Sándwich Cubano",
    emoji: "🥖",
    items: [
      {
        id: 1,
        name: "Cubano Clásico",
        description: "Jamón, cerdo, queso suizo, pepinillos y mostaza en pan crujiente",
        price: "$18.000",
        image: "/images/comidas_2.jpg",
      },
      {
        id: 2,
        name: "Cubano Especial",
        description: "Doble jamón, pollo, queso, aguacate y salsa de la casa",
        price: "$22.000",
        image: "/images/comidas_3.jpg",
      },
    ],
  },
  {
    id: "carta",
    label: "Platos a la Carta",
    emoji: "🍽️",
    items: [
      {
        id: 1,
        name: "Bandeja Regional",
        description: "Arroz, fríjoles, carne, chicharrón, huevo y aguacate",
        price: "$22.000",
        image: "/images/comidas_4.jpg",
      },
      {
        id: 2,
        name: "Pollo con Champiñones",
        description: "Pechuga a la plancha con salsa de champiñones y arroz",
        price: "$24.000",
        image: "/images/comidas_1.jpg",
      },
      {
        id: 3,
        name: "Salchipapa Especial",
        description: "Papas fritas con salchicha, queso derretido y salsas",
        price: "$14.000",
        image: "/images/comidas_2.jpg",
      },
      {
        id: 4,
        name: "Recepción / Pedido Especial",
        description: "Menú personalizado para eventos. Consulta disponibilidad",
        price: "Consultar",
        image: "/images/comidas_3.jpg",
      },
    ],
  },
];

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden flex flex-col">
      <div className="relative h-44 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h5 className="font-bold text-gray-900 mb-1">{item.name}</h5>
        <p className="text-sm text-gray-500 mb-3 flex-1">{item.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-lg font-bold text-yellow-500"
            style={{ textShadow: "0 0 2px #00000066" }}
          >
            {item.price}
          </span>
          {item.price !== "Consultar" ? (
            <Link
              href={createWhatsAppMessage(item.name, item.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#029264] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#027a54] transition-colors"
            >
              Pedir
            </Link>
          ) : (
            <Link
              href="https://wa.me/573123946614?text=Hola%2C%20me%20interesa%20un%20pedido%20especial%20o%20recepc%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#029264] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#027a54] transition-colors"
            >
              Consultar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DigitalMenu() {
  const [activeCategory, setActiveCategory] = useState("pizzas");

  const currentCategory = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu-digital" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            🍽️ Menú Digital
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestras categorías y haz tu pedido directo por WhatsApp
          </p>
        </div>

        {/* Tabs de categorías */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
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

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
