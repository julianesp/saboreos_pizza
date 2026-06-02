"use client";

import { Star, Utensils, X } from "lucide-react";

import { useState } from "react";
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";
import FloatingFooter from "../components/FloatingFooter";
import Navbar from "../components/Navbar";
import Footer from "../containers/Footer";
import MenuCategoriesBar from "../components/MenuCategoriesBar";
// import AnnouncementBanner from "../components/AnnouncementBanner";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ReviewsSection from "../components/ReviewsSection";
import LocationsSection from "../components/LocationsSection";
import DigitalMenu from "../components/DigitalMenu";
import {
  createWhatsAppMessage,
  createFoodOrderMessage,
} from "../utils/whatsapp";
import Link from "next/link";
import { Clock } from "lucide-react";
import styles from "../styles/Home.module.scss";
import PromoCarousel from "../components/PromoCarousel";
import MarqueeCards, { type MarqueeItem } from "../components/MarqueeCards";

const featuredPizzas = [
  {
    id: 1,
    name: "Postre con galleta",
    description:
      "Un dulce final irresistible: galletas crujientes, caramelo derretido y un toque de canela que hace cada bocado una experiencia celestial",
    price: "$18.990",
    image:
      "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
  },
  {
    id: 2,
    name: "Pepperoni Clásica",
    description:
      "Generosas rodajas de pepperoni, mozzarella derretida y orégano fresco",
    price: "$21.990",
    image: "/images/pizza_2.jpg",
  },
  {
    id: 3,
    name: "Hawaiana Gourmet",
    description:
      "Jamón premium, piña tropical, mozzarella y un toque de cilantro",
    price: "$22.990",
    image: "/images/pizza_3.jpg",
  },
];

const mostPopular = {
  name: "Hawaiana",
  description: "Jamón premium, piña tropical, mozzarella",
  price: "$25.000",
  image:
    "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
};

const pizzaOfTheDay = {
  name: "Pizza tropical",
  description:
    "Una deliciosa combinación de sabores dulces y salados: jugosa piña, jamón ahumado y queso fundido sobre una base crujiente. ¡Un clásico que te transporta directo al paraíso en cada bocado! 🌴✨",
  price: "$23.990",
  image:
    "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
  special: "¡Solo por hoy!",
};

const specialOffer = {
  name: "Pizza Familiar",
  description:
    "Perfecta para compartir en familia o con amigos. Ingredientes frescos y una masa artesanal que te encantará.",
  price: "$55.000",
  // originalPrice: "$34.990",
  image:
    "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
  discount: "18% OFF",
};

const chefRecommendation = {
  name: "Vegetariana",
  description:
    "Una exquisita combinación de vegetales frescos: pimientos, champiñones, cebolla morada, aceitunas negras y tomate, sobre una base de salsa de tomate artesanal y mozzarella derretida. Perfecta para quienes buscan sabor y frescura en cada bocado.",
  price: "$32.900",
  image:
    "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
  badge: "",
};

// Promo carousel images (R2 Cloudflare) — datos reales del menú
const promoImages = [
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/1.jpeg",  alt: "Hawaiana",               name: "Hawaiana",               description: "Jamón y piña caramelizada.",                              price: "Desde $25.000" },
  { src: "https://media.saboreospizza.com/pizzas/2.jpeg",                        alt: "Pepperoni",              name: "Pepperoni",              description: "Clásica y deliciosa.",                                    price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/3.jpeg",  alt: "Pollo con Champiñones",  name: "Pollo con Champiñones",  description: "Cremosa y sabrosa.",                                      price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/4.jpeg",  alt: "Pollo y Jamón",          name: "Pollo y Jamón",          description: "Una combinación suave y tradicional.",                    price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/5.jpeg",  alt: "Pollo y Piña",           name: "Pollo y Piña",           description: "El balance perfecto entre dulce y salado.",              price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/6.jpeg",  alt: "Carnes Mixtas",          name: "Carnes Mixtas",          description: "Res, pollo desmechado, jamón y salchicha.",              price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/7.jpeg",  alt: "Pollo y Maíz",           name: "Pollo y Maíz",           description: "Suavecita y dorada.",                                     price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/8.jpeg",  alt: "Tocineta con Maíz",      name: "Tocineta con Maíz",      description: "Crocante y deliciosa.",                                   price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/9.jpeg",  alt: "Chorizo y Jamón",        name: "Chorizo, Salchicha y Jamón", description: "Bien cargada de sabor.",                             price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/10.jpeg", alt: "Vegetariana",            name: "Vegetariana",            description: "Tomate, cebolla, maíz, champiñones y pimentón.",          price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/11.jpeg", alt: "Mexicana",               name: "Mexicana 🌶️",           description: "Carne molida, ají, maíz y pimentón rojo. ¡Picante!",     price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/12.jpeg", alt: "Napolitana",             name: "Napolitana",             description: "Tomates frescos con finas hierbas.",                      price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/13.jpeg", alt: "Tropical",               name: "Tropical",               description: "Durazno, cereza, piña y uvas pasas.",                     price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/14.jpeg", alt: "Pizza Familiar",         name: "Pizza Familiar",         description: "50cm · 16 porciones. La más grande para compartir.",     price: "$55.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/15.jpeg", alt: "Pizza Mediana",          name: "Pizza Mediana",          description: "35cm · 8 porciones. Perfecta para 2–3 personas.",        price: "$35.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/16.jpeg", alt: "Pizza Grande",           name: "Pizza Grande",           description: "40cm · 12 porciones. Ideal para grupos.",                price: "$45.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/17.jpeg", alt: "Extra Queso",            name: "Extra Queso ⭐",         description: "Agrégale más queso a cualquier pizza. ¡Vale la pena!",   price: "+$7.000 / +$11.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/18.jpeg", alt: "Pizza Pequeña",          name: "Pizza Pequeña",          description: "26cm · 4 porciones. Ideal para 1 persona.",              price: "$25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/19.jpeg", alt: "Saboreos Pizza",         name: "¡Pide a Domicilio!",     description: "Entregamos tu pizza favorita directamente en tu puerta.", price: "Consultar" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/20.jpeg", alt: "Saboreos Pizza",         name: "Saboreos Pizza",         description: "Masa artesanal, ingredientes frescos y mucho sabor.",     price: "Desde $25.000" },
  { src: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/pizzas/21.jpeg", alt: "Saboreos Pizza",         name: "Tu Pizza, Tu Tamaño",    description: "Pequeña · Mediana · Grande · Familiar. ¡Tú eliges!",    price: "Desde $25.000" },
];

// Marquee belt items
const marqueeItems: MarqueeItem[] = [
  {
    label: "🏆 La Más Pedida",
    labelColor: "text-[#029264]",
    bg: "bg-white",
    border: "border border-[#029264]",
    image: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
    name: mostPopular.name,
    description: mostPopular.description,
    price: mostPopular.price,
    whatsappHref: `https://wa.me/3123946614?text=${encodeURIComponent(`¡Hola! Me interesa ordenar una pizza *${mostPopular.name}* (${mostPopular.price}). ¿Podrían ayudarme con el pedido?`)}`,
  },
  {
    label: "🌅 Pizza del Día",
    labelColor: "text-orange-500",
    bg: "bg-orange-50",
    border: "border border-orange-200",
    image: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
    name: pizzaOfTheDay.name,
    description: pizzaOfTheDay.description,
    price: pizzaOfTheDay.price,
    whatsappHref: `https://wa.me/3123946614?text=${encodeURIComponent(`¡Hola! Me interesa ordenar una pizza *${pizzaOfTheDay.name}* (${pizzaOfTheDay.price}). ¿Podrían ayudarme con el pedido?`)}`,
  },
  {
    label: "🔥 Oferta Especial",
    labelColor: "text-red-500",
    bg: "bg-red-50",
    border: "border border-red-200",
    image: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
    name: specialOffer.name,
    description: specialOffer.description,
    price: specialOffer.price,
    whatsappHref: `https://wa.me/3123946614?text=${encodeURIComponent(`¡Hola! Me interesa ordenar una pizza *${specialOffer.name}* (${specialOffer.price}). ¿Podrían ayudarme con el pedido?`)}`,
    badge: { text: specialOffer.discount, side: "right" },
  },
  {
    label: "👨‍🍳 Chef",
    labelColor: "text-purple-500",
    bg: "bg-purple-50",
    border: "border border-purple-200",
    image: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
    name: chefRecommendation.name,
    description: chefRecommendation.description,
    price: chefRecommendation.price,
    whatsappHref: `https://wa.me/3123946614?text=${encodeURIComponent(`¡Hola! Me interesa ordenar una pizza *${chefRecommendation.name}* (${chefRecommendation.price}). ¿Podrían ayudarme con el pedido?`)}`,
    badge: { text: "Chef Choice", side: "left" },
  },
];

// Fotos del chef enseñando a niños
const teachingImages = [
  "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/ense%C3%B1ando/1.jpeg",
  "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/ense%C3%B1ando/2.jpeg",
  "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/ense%C3%B1ando/3.jpeg",
  "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/ense%C3%B1ando/4.jpeg",
  "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/ense%C3%B1ando/5.jpeg",
];

// Image data for sliders
const imageCategories = {
  pizza: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  comidas: ["1", "2", "3", "4"],
  preparacion: ["1", "2", "3", "4", "5"],
};

// Food menu items data
const foodMenuItems = [
  { id: 1,  name: "Clásica Saboreos",              url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/1.jpeg" },
  { id: 2,  name: "Lasaña",                         url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/2.jpeg" },
  { id: 4,  name: "Lasaña",                         url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/4.jpeg" },
  { id: 5,  name: "Salchipapa",                     url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/5.jpeg" },
  { id: 6,  name: "Salchipapa Clásica Saboreos",    url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/6.jpeg" },
  { id: 7,  name: "Picada",                         url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/7.jpeg" },
  { id: 8,  name: "Salchipapa Clásica Saboreos",    url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/8.jpeg" },
  { id: 9,  name: "Salchipapa Clásica Saboreos",    url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/9.jpeg" },
  { id: 10, name: "Alitas",                         url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/10.jpeg" },
  { id: 11, name: "Lasaña",                         url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/11.jpeg" },
  { id: 12, name: "Sandwich con Papa",              url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/12.jpeg" },
  { id: 13, name: "Picada Carne Papa Patacón",      url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/13.jpeg" },
  { id: 15, name: "Salchipapa Clásica Saboreos",    url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/15.jpeg" },
  { id: 16, name: "Salchipapa",                     url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/16.jpeg" },
  { id: 20, name: "Salchipapa",                     url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/other_foods/20.jpeg" },
  { id: 22, name: "Pechuga a la Plancha",           url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/foods/comidas_2.jpg" },
  { id: 23, name: "Carne de Cerdo a la Parrilla",   url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/foods/comidas_3.jpg" },
  { id: 24, name: "Parrilla Mixta al Carbón",       url: "https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/foods/comidas_4.jpg" },
];

export default function Home() {
  const [chefPhotoOpen, setChefPhotoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* <AnnouncementBanner /> */}
      <Navbar />
      <div className="pt-14">
        <MenuCategoriesBar />
      </div>

      <div className="w-full">
        <PromoCarousel
          images={promoImages}
          autoplayInterval={5000}
          whatsappBase="https://wa.me/3123946614"
        />
      </div>

      <section id="inicio" className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center ">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a{" "}
            <span className="text-emerald-600">Saboreos Pizza</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Donde cada pizza es una obra maestra. Ingredientes frescos, recetas
            tradicionales y el amor por la auténtica cocina italiana se
            encuentran en cada bocado.
          </p>

          {/* <a 
            href="#destacadas"
            className="bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-emerald-700 transition-colors shadow-lg inline-block"
          >
            Ver Nuestras Pizzas
          </a> */}
        </div>

        <div id="especialidades" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageSlider
            images={imageCategories.pizza}
            category="pizza"
            title="Nuestras Pizzas"
            autoplayInterval={4000}
          />
          <ImageSlider
            images={imageCategories.comidas}
            category="comidas"
            title="Otras Especialidades"
            autoplayInterval={2500}
          />
        </div>
      </section>

      <section className="w-full overflow-hidden bg-[#029264]/80 backdrop-blur-sm">
        <MarqueeCards items={marqueeItems} speed={55} />
      </section>

      {/* Pizzas Destacadas */}
      <section id="destacadas" className="py-6 px-4 sm:px-6 lg:px-8">
        <div>
          <ImageSlider
            images={teachingImages}
            category="teaching"
            title="Enseñando con sabor"
            autoplayInterval={3500}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Título oculto hasta que el backend de calificaciones esté listo
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pizzas Destacadas del Día
            </h3>
            <p className="text-gray-600">
              Nuestras especialidades más populares, preparadas con ingredientes
              frescos y de la más alta calidad
            </p>
          </div>
          */}

          {/*
            TODO (backend pendiente): Pizzas Destacadas del Día
            =====================================================
            Cuando el chef confirme implementar el backend, esta sección
            mostrará las pizzas mejor calificadas por los usuarios.

            Flujo previsto:
            1. El usuario le da estrellas (1–5) a cada pizza.
            2. Las calificaciones se guardan en la base de datos.
            3. Esta sección consulta las 3 pizzas con mayor rating promedio
               y las muestra aquí de forma dinámica.

            Mientras tanto la sección está oculta para no mostrar
            datos de ejemplo que no reflejan el menú real.

            Código original de las tarjetas:

            <div className="grid md:grid-cols-3 gap-4">
              {featuredPizzas.map((pizza) => (
                <div
                  key={pizza.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 flex items-center gap-4 p-4"
                >
                  <div className="w-20 h-20 shrink-0 relative rounded-full overflow-hidden shadow-md">
                    <Image src={pizza.image} alt={pizza.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-gray-900 truncate mb-1">{pizza.name}</h4>
                    <p className="text-gray-500 text-xs leading-snug line-clamp-2 mb-2">{pizza.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-yellow-500" style={{ textShadow: "0 1px 3px rgba(0,0,0,.25)" }}>
                        {pizza.price}
                      </span>
                      <Link
                        href={createWhatsAppMessage(pizza.name, pizza.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto shrink-0 bg-[#029264] text-white px-3 py-1.5 rounded-lg hover:bg-[#027a54] transition-colors text-xs font-semibold"
                      >
                        Pedir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          */}
        </div>
      </section>

      {/* Menú Digital por Categorías */}
      <DigitalMenu />

      {/* Menú de Comidas Grid */}
      <section
        id="menu-comidas"
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🍽️ Nuestro Menú de Comidas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra variedad de platos tradicionales y
              especialidades. ¡Pide directamente al chef por WhatsApp!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {foodMenuItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-xl overflow-hidden shadow-md bg-gray-50 hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800 text-center leading-tight">
                    {item.name}
                  </p>
                  <Link
                    href={createFoodOrderMessage(item.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#029264] text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-[#027a54] transition-colors duration-200"
                  >
                    <Utensils className="h-3.5 w-3.5" />
                    Pedir comida
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Utensils className="h-12 w-12 text-emerald-400 mx-auto mb-4 hover:-scale-x-100 transition-normal duration-500 delay-100 hover:rotate-45" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">
              Ingredientes Frescos
            </h4>
            <p className="text-gray-100">
              Seleccionamos solo los mejores ingredientes de la región para
              nuestras pizzas
            </p>
          </div>
          <div>
            <Clock className="h-12 w-12 text-emerald-400 mx-auto mb-4 transition-normal duration-500 delay-100 hover:rotate-180" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">
              Entrega Rápida
            </h4>
            <p className="text-gray-100">
              Entrega a domicilio para Santiago, Colón, San Pedro, Sibundoy y
              San Francisco
            </p>
          </div>
          <div>
            <Star className="h-12 w-12 text-emerald-400 mx-auto mb-4  transition-normal duration-500 delay-100 hover:rotate-180" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">
              Calidad Garantizada
            </h4>
            <p className="text-gray-100">
              Más de 10 años perfeccionando nuestras recetas tradicionales
            </p>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      {/* <ReviewsSection /> */}

      {/* Sedes con Google Maps */}
      <LocationsSection />

      {/* Conoce al Chef */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-2">
            👨‍🍳 Conoce al Chef
          </h3>
          <p className="text-white/60 text-sm mb-10">
            La persona detrás de cada sabor
          </p>

          {/* Foto centrada — clic para expandir */}
          <button
            onClick={() => setChefPhotoOpen(true)}
            className="relative w-64 h-64 mx-auto rounded-full overflow-hidden shadow-xl ring-4 ring-white/10 mb-6 block cursor-zoom-in hover:ring-emerald-400 transition-all duration-200"
            aria-label="Ver foto del chef"
          >
            <Image
              src="https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/cheff.jpeg"
              alt="Chef Saboreos Pizza"
              fill
              className="object-cover"
            />
          </button>

          <h4 className="text-2xl font-bold text-white mb-1">
            El Chef de Saboreos
          </h4>
          <p className="text-emerald-400 font-medium text-sm mb-6">
            Fundador · Chef Principal · Instructor
          </p>

          {/* Reemplaza este texto con la descripción real del chef */}
          <p className="text-white/70 leading-relaxed max-w-xl mx-auto">
            Escribe aquí la descripción del chef: su historia, su pasión
            por la cocina, su experiencia y lo que lo hace especial.
          </p>
        </div>
      </section>

      <Footer />

      <FloatingFooter />

      <ScrollToTopButton />

      {/* Modal foto chef */}
      {chefPhotoOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/60"
          onClick={() => setChefPhotoOpen(false)}
        >
          <div
            className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="https://pub-2f281a1b18194582a64434d6846baf97.r2.dev/cheff.jpeg"
              alt="Chef Saboreos Pizza"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={() => setChefPhotoOpen(false)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
