"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Pizza } from "lucide-react";
import { generalWhatsAppMessage } from "../utils/whatsapp";

const Footer = () => {
  return (
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
            artesanales con salsa de la casa, masa casera y queso de la región,
            acompañadas de una gran variedad de ingredientes frescos. Además,
            disfruta de lasaña, hamburguesas, salchipapas, sándwich cubano,
            mazorcadas, alitas, platos a la carta y recetas tradicionales por
            encargo. También atendemos recepciones y pedidos especiales.
          </p>
          <p className="text-white">
            👉 En Saboreos, cada plato es una experiencia que combina tradición
            y sabor auténtico.
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
                <Link
                  href="tel:+573123946614"
                  className="text-gray-300 hover:text-emerald-400 transition-colors font-medium px-3 py-1 rounded bg-emerald-700/20"
                >
                  312-394-6614
                </Link>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">
                  Martes-Domingo: 04:00 p.m - 11:00 p.m
                </span>
              </div>
            </div>
          </div>

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
                  <span className="text-gray-300">Colón, Barrio Porvenir</span>
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
      </div>
    </footer>
  );
};

export default Footer;
