"use client";

import { Star, Utensils, ChevronLeft, ChevronRight } from "lucide-react";

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
  createFoodMenuMessage,
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

// Image data for sliders
const imageCategories = {
  pizza: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  comidas: ["1", "2", "3", "4"],
  preparacion: ["1", "2", "3", "4", "5"],
};

// Food menu images data
const foodMenuImages = [
  {
    id: 1,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_2.jpg",
    alt: "Menú de comidas 1",
  },
  {
    id: 2,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_2.jpg",
    alt: "Menú de comidas 2",
  },
  {
    id: 3,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_3.jpg",
    alt: "Menú de comidas 3",
  },
  {
    id: 4,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_4.jpg",
    alt: "Menú de comidas 4",
  },
  {
    id: 5,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_1.jpg",
    alt: "Menú de comidas 5",
  },
  {
    id: 6,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_2.jpg",
    alt: "Menú de comidas 6",
  },
  {
    id: 7,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_3.jpg",
    alt: "Menú de comidas 7",
  },
  {
    id: 8,
    url: "https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/saboreos/preparados/comidas_4.jpg",
    alt: "Menú de comidas 8",
  },
];

export default function Home() {
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);

  const nextFoodSlide = () => {
    setCurrentFoodIndex((prevIndex) =>
      prevIndex === foodMenuImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevFoodSlide = () => {
    setCurrentFoodIndex((prevIndex) =>
      prevIndex === 0 ? foodMenuImages.length - 1 : prevIndex - 1,
    );
  };

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
            images={imageCategories.preparacion}
            category="preparacion"
            title="Mi formación"
            autoplayInterval={3500}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pizzas Destacadas del Día
            </h3>
            <p className="text-gray-600">
              Nuestras especialidades más populares, preparadas con ingredientes
              frescos y de la más alta calidad
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {featuredPizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 flex items-center gap-4 p-4"
              >
                <div className="w-20 h-20 shrink-0 relative rounded-full overflow-hidden shadow-md">
                  <Image
                    src={pizza.image}
                    alt={pizza.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-gray-900 truncate mb-1">
                    {pizza.name}
                  </h4>
                  <p className="text-gray-500 text-xs leading-snug line-clamp-2 mb-2">
                    {pizza.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-extrabold text-yellow-500"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,.25)" }}
                    >
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
        </div>
      </section>

      {/* Menú Digital por Categorías */}
      <DigitalMenu />

      {/* Menú de Comidas Carousel */}
      <section
        id="menu-comidas"
        className={`relative py-16 px-4 sm:px-6 lg:px-8 bg-white  `}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🍽️ Nuestro Menú de Comidas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra variedad de platos tradicionales y
              especialidades. ¡Contacta al chef para conocer precios y
              disponibilidad!
            </p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-xl shadow-lg bg-gray-50">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={foodMenuImages[currentFoodIndex].url}
                  alt={foodMenuImages[currentFoodIndex].alt}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out"
                  priority
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevFoodSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextFoodSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {foodMenuImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFoodIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentFoodIndex
                          ? "bg-white scale-110"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Link
                href={createFoodMenuMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#029264] text-white px-8 py-4 text-lg rounded-lg hover:bg-[#027a54] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Utensils className="h-6 w-6 mr-2" />
                Ver Menú Completo
              </Link>
            </div>
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

      <Footer />

      <FloatingFooter />

      <ScrollToTopButton />
    </div>
  );
}
