"use client";

import { useState, useEffect } from "react";
import { Eye, Users, TrendingUp, Globe } from "lucide-react";
import { visitTracker } from "../utils/visitTracker";

interface VisitStatsData {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  averageTime: string;
}

export default function VisitStats() {
  const [stats, setStats] = useState<VisitStatsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    averageTime: "0:00"
  });
  const [isLoading, setIsLoading] = useState(true);

  const updateStats = () => {
    if (typeof window !== 'undefined') {
      const currentStats = visitTracker.getStats();
      const totalVisits = visitTracker.getTotalVisitsAllTime();

      setStats({
        totalVisits: totalVisits,
        uniqueVisitors: currentStats.uniqueVisitors,
        todayVisits: currentStats.todayVisits,
        averageTime: currentStats.averageTime
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      visitTracker.trackPageVisit();

      const initialTimer = setTimeout(() => {
        updateStats();
      }, 500);

      const interval = setInterval(() => {
        visitTracker.trackTimeSpent();
        updateStats();
      }, 10000);

      const beforeUnloadHandler = () => {
        visitTracker.trackTimeSpent();
      };

      window.addEventListener('beforeunload', beforeUnloadHandler);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
        window.removeEventListener('beforeunload', beforeUnloadHandler);
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 shadow-lg">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-20 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-CO');
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            📊 Estadísticas de Visitas
          </h3>
          <p className="text-gray-600">
            Datos en tiempo real de visitantes de Saboreos Pizza
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            ¡Actualizado automáticamente cada 10 segundos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total de Visitas */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">Total</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatNumber(stats.totalVisits)}
                </p>
              </div>
            </div>
            <p className="text-blue-700 text-sm font-medium">Visitas (Desde inicio)</p>
          </div>

          {/* Visitantes Únicos */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-600 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-600 font-medium">Únicos</p>
                <p className="text-2xl font-bold text-emerald-900">
                  {formatNumber(stats.uniqueVisitors)}
                </p>
              </div>
            </div>
            <p className="text-emerald-700 text-sm font-medium">Visitantes Únicos (Hoy)</p>
          </div>

          {/* Visitas de Hoy */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-600 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600 font-medium">Hoy</p>
                <p className="text-2xl font-bold text-orange-900">
                  {formatNumber(stats.todayVisits)}
                </p>
              </div>
            </div>
            <p className="text-orange-700 text-sm font-medium">Visitas de Hoy</p>
          </div>

          {/* Tiempo Promedio */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-600 font-medium">Promedio</p>
                <p className="text-2xl font-bold text-purple-900">
                  {stats.averageTime}
                </p>
              </div>
            </div>
            <p className="text-purple-700 text-sm font-medium">Tiempo en Sitio</p>
          </div>
        </div>

        {/* Mensaje adicional */}
        <div className="text-center mt-8 p-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg">
          <p className="text-emerald-800 font-medium">
            ¡Gracias por ser parte de la familia Saboreos Pizza! 🍕
          </p>
          <p className="text-emerald-600 text-sm mt-1">
            Cada visita nos motiva a seguir ofreciendo las mejores pizzas artesanales
          </p>
          {stats.todayVisits > 0 && (
            <p className="text-emerald-700 text-xs mt-2 italic">
              Tú eres el visitante #{stats.todayVisits} de hoy 👋
            </p>
          )}
        </div>
      </div>
    </section>
  );
}