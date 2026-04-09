"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

const locations = [
  {
    id: "colon",
    name: "Sede Colón",
    address: "Calle 2 # 6 - 15, Barrio Porvenir",
    city: "Colón, Putumayo",
    hours: "Martes - Domingo: 4:00 p.m - 11:00 p.m",
    phone: "+57 312-394-6614",
    // Coordenadas de Colón, Putumayo
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7!2d-76.9805!3d1.1843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTEnMDMuNSJOIDc2wrA1OCc1MC44Ilc!5e0!3m2!1ses!2sco!4v1699999999",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1.190347,-76.970656",
  },
  {
    id: "sibundoy",
    name: "Sede Sibundoy",
    address: "Al lado de Comfamiliar",
    city: "Sibundoy, Barrio Castelvi, Putumayo",
    hours: "Martes - Domingo: 4:00 p.m - 11:00 p.m",
    phone: "+57 312-394-6614",
    // Coordenadas de Sibundoy, Putumayo
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.7!2d-76.9195!3d1.2033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTInMTEuOSJOIDc2wrA1NScxMC4yIlc!5e0!3m2!1ses!2sco!4v1699999999",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1.2052359,-76.9190961",
  },
];

export default function LocationsSection() {
  return (
    <section id="sedes" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            📍 Nuestras Sedes
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuéntranos en el Valle de Sibundoy, Putumayo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            >
              {/* Mapa embebido */}
              <div className="relative w-full h-56">
                <iframe
                  src={loc.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${loc.name}`}
                  className="w-full h-full"
                />
              </div>

              {/* Info de la sede */}
              <div className="p-6 bg-white">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {loc.name}
                </h4>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-medium">{loc.address}</p>
                      <p className="text-gray-500 text-sm">{loc.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{loc.hours}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <Link
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-gray-600 text-sm hover:text-emerald-600 transition-colors"
                    >
                      {loc.phone}
                    </Link>
                  </div>
                </div>

                <Link
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium w-full justify-center"
                >
                  <MapPin className="h-4 w-4" />
                  Cómo llegar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
