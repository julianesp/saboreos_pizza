"use client";

import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment:
      "¡La mejor pizza del Putumayo! La masa casera es increíble y los ingredientes súper frescos. Ya es nuestra pizzería favorita en familia.",
    date: "Hace 2 semanas",
    avatar: "MG",
  },
  {
    id: 2,
    name: "Carlos Andrade",
    rating: 5,
    comment:
      "Pedí la hawaiana y quedé encantado. Llegó rapidísimo y estaba perfectamente caliente. El servicio por WhatsApp es muy cómodo.",
    date: "Hace 1 mes",
    avatar: "CA",
  },
  {
    id: 3,
    name: "Luisa Pantoja",
    rating: 5,
    comment:
      "Las alitas y la mazorcada están deliciosas. Se nota que todo es hecho con amor y dedicación. 100% recomendados.",
    date: "Hace 3 semanas",
    avatar: "LP",
  },
  {
    id: 4,
    name: "Jhon Torres",
    rating: 5,
    comment:
      "Pedimos para una reunión familiar y quedamos todos satisfechos. Variedad excelente y precios muy justos para la calidad.",
    date: "Hace 2 meses",
    avatar: "JT",
  },
  {
    id: 5,
    name: "Sandra Muñoz",
    rating: 5,
    comment:
      "El sándwich cubano es espectacular. Y la atención es muy amable y rápida. Sin duda volvemos pronto.",
    date: "Hace 1 semana",
    avatar: "SM",
  },
  {
    id: 6,
    name: "Ricardo Erazo",
    rating: 4,
    comment:
      "Muy buena pizza vegetariana, se nota la calidad de los ingredientes frescos. El local de Sibundoy siempre cumple.",
    date: "Hace 3 meses",
    avatar: "RE",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="resenas" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            ⭐ Lo que dicen nuestros clientes
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Promedio general */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-4 shadow-md">
            <span className="text-5xl font-bold text-emerald-600">4.9</span>
            <div className="text-left">
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Basado en nuestros clientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
