"use client";

import { Phone, MapPin, Clock, Star, Pizza, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";
import FloatingFooter from "../components/FloatingFooter";
import Navbar from "../components/Navbar";
import {
  createWhatsAppMessage,
  generalWhatsAppMessage,
  createFoodMenuMessage,
} from "../utils/whatsapp";
import Link from "next/link";

const featuredPizzas = [
  {
    id: 1,
    name: "Margarita Suprema",
    description:
      "Salsa de tomate artesanal, mozzarella fresca, albahaca y aceite de oliva extra virgen",
    price: "$18.990",
    image: "🍕",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Pepperoni Clásica",
    description:
      "Generosas rodajas de pepperoni, mozzarella derretida y orégano fresco",
    price: "$21.990",
    image: "🍕",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Hawaiana Gourmet",
    description:
      "Jamón premium, piña tropical, mozzarella y un toque de cilantro",
    price: "$22.990",
    image: "🍕",
    rating: 4.7,
  },
];

const mostPopular = {
  name: "Quattro Formaggi",
  description:
    "Una deliciosa mezcla de mozzarella, gorgonzola, parmesano y provolone con nueces",
  price: "$25.990",
  image: "🧀",
  rating: 4.9,
  orders: "152 pedidos esta semana",
};

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
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/1.jpg",
    alt: "Menú de comidas 1"
  },
  {
    id: 2,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/2.jpg",
    alt: "Menú de comidas 2"
  },
  {
    id: 3,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/3.jpg",
    alt: "Menú de comidas 3"
  },
  {
    id: 4,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/4.jpg",
    alt: "Menú de comidas 4"
  },
  {
    id: 5,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/5.jpg",
    alt: "Menú de comidas 5"
  },
  {
    id: 6,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/6.jpg",
    alt: "Menú de comidas 6"
  },
  {
    id: 7,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/7.jpg",
    alt: "Menú de comidas 7"
  },
  {
    id: 8,
    url: "https://ipbxcphqipulqm7d.public.blob.vercel-storage.com/images/listado%20food/8.jpg",
    alt: "Menú de comidas 8"
  }
];

export default function Home() {
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);

  const nextFoodSlide = () => {
    setCurrentFoodIndex((prevIndex) => 
      prevIndex === foodMenuImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevFoodSlide = () => {
    setCurrentFoodIndex((prevIndex) => 
      prevIndex === 0 ? foodMenuImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />

      <section id="inicio" className="py-6 px-4 sm:px-6 lg:px-8">
        <ImageSlider
          images={imageCategories.pizza}
          category="pizza"
          title=""
          autoplayInterval={4000}
        />

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

        <div id="especialidades" className="flex items-center space-x-2 py-6">
          <ImageSlider
            images={imageCategories.comidas}
            category="comidas"
            title="Otras Especialidades"
            autoplayInterval={2500}
          />
        </div>
      </section>

      {/* Pizza Más Popular */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🏆 La Más Pedida
            </h3>
            <p className="text-gray-600">{mostPopular.orders}</p>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4">{mostPopular.image}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {mostPopular.name}
                </h4>
                <p className="text-gray-600 mb-4">{mostPopular.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-gray-600">
                      ({mostPopular.rating})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-emerald-600">
                    {mostPopular.price}
                  </span>
                  <Link
                    href={createWhatsAppMessage(
                      mostPopular.name,
                      mostPopular.price
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-block"
                  >
                    Pedir por WhatsApp
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <div className="text-9xl opacity-50">{mostPopular.image}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pizzas Destacadas */}
      <section id="destacadas" className="py-6 px-4 sm:px-6 lg:px-8">
        <div>
          <ImageSlider
            images={imageCategories.preparacion}
            category="preparacion"
            title="Mi Preparación"
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

          <div className="grid md:grid-cols-3 gap-8 ">
            {featuredPizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 duration-200 ease-in-out"
              >
                <div className="p-6">
                  <div className="text-4xl text-center mb-4">{pizza.image}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {pizza.name}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {pizza.description}
                  </p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({pizza.rating})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      {pizza.price}
                    </span>
                    <Link
                      href={createWhatsAppMessage(pizza.name, pizza.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm inline-block"
                    >
                      Pedir por WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menú de Comidas Carousel */}
      <section id="menu-comidas" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🍽️ Nuestro Menú de Comidas
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra variedad de platos tradicionales y especialidades. 
              ¡Contacta al chef para conocer precios y disponibilidad!
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
                          ? 'bg-white scale-110' 
                          : 'bg-white/60 hover:bg-white/80'
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
                className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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

      {/* grid md:grid-cols-4 gap-8 */}
      {/* Footer */}
      <footer
        id="contacto"
        className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="h-8 w-8 text-emerald-400" />
              <h3 className="text-2xl font-bold">Saboreos Pizza</h3>
            </div>
            <p className="text-white mb-4">
              El sabor único del Putumayo en cada bocado. Preparamos pizzas
              artesanales con salsa de la casa, masa casera y queso de la
              región, acompañadas de una gran variedad de ingredientes frescos.
              Además, disfruta de lasaña, hamburguesas, salchipapas, sándwich
              cubano, mazorcadas, alitas, platos a la carta y recetas
              tradicionales por encargo. También atendemos recepciones y pedidos
              especiales.
            </p>
            <p className="text-white">
              👉 En Saboreos, cada plato es una experiencia que combina
              tradición y sabor auténtico.
            </p>
          </div>

          {/* Info Sections - Responsive Grid */}
          <div className="grid grid-cols-1 gap-8 max-[425px]:grid-cols-2 max-[425px]:grid-rows-2 min-[426px]:grid-cols-2 lg:grid-cols-3">
            {/* Contacto - Mobile: Top Left, Desktop: Column 1 */}
            <div className="max-[425px]:col-start-1 max-[425px]:row-start-1">
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">+57 317-769-4172</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">+57 312-394-6614</span>
                </div>

                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">
                    Martes-Domingo: 04:00 p.m - 11:00 p.m
                  </span>
                </div>
              </div>
            </div>

            {/* Síguenos - Mobile: Top Right, Desktop: Column 2 */}
            <div className="max-[425px]:col-start-2 max-[425px]:row-start-1">
              <h4 className="text-lg font-bold mb-4">Síguenos</h4>
              <div className="space-y-2">
                <Link
                  href="https://www.facebook.com/saboreospizza"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors"
                  target="_blank"
                >
                  Facebook
                </Link>

                <Link
                  href="https://www.instagram.com/saboreospizza/"
                  target="_blank"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Instagram
                </Link>

                <Link
                  href={generalWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  WhatsApp
                </Link>
              </div>
            </div>

            {/* Visítanos - Mobile: Bottom (spans both columns), Desktop: Column 3 */}
            <div className="max-[425px]:col-span-2 max-[425px]:row-start-2">
              <h4 className="text-lg font-bold mb-4">Visítanos</h4>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    <span className="text-gray-300">
                      Colón, Barrio Porvenir
                    </span>
                  </div>
                  <span className="text-gray-300 ml-7">Calle 2 # 6 - 15</span>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                    <span className="text-gray-300">
                      Sibundoy, Barrio Castelvi
                    </span>
                  </div>
                  <span className="text-gray-300 ml-7">
                    Al lado de Comfamiliar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Saboreos Pizza</p>
          </div> */}
        </div>
      </footer>

      {/* Floating Footer */}
      <FloatingFooter />
    </div>
  );
}
