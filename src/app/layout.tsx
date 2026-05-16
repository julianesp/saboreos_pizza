import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import PizzaLoader from "../components/PizzaLoader";
import ThemeProvider from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saboreos Pizza - Pizzas Artesanales del Putumayo",
  description:
    "Las mejores pizzas artesanales de Saboreos Pizza. Ingredientes frescos, masa casera y el auténtico sabor del Putumayo. Pedidos por WhatsApp.",
  keywords:
    "pizzas, artesanales, Putumayo, Saboreos, comida italiana, delivery",
  authors: [{ name: "Saboreos Pizza" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Saboreos Pizza - Pizzas Artesanales del Putumayo",
    description:
      "Las mejores pizzas artesanales con ingredientes frescos y masa casera",
    type: "website",
    images: [
      {
        url: "https://media.saboreospizza.com/logo.jpg",
        width: 512,
        height: 512,
        alt: "Saboreos Pizza Logo",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Saboreos Pizza",
  description:
    "Pizzería artesanal con dos sedes en el Valle de Sibundoy, Putumayo. Pizzas artesanales, lasaña, hamburguesas, alitas, mazorcadas, sándwich cubano y platos a la carta.",
  url: "https://saboreospizza.com",
  telephone: "+573123946614",
  image: "https://media.saboreospizza.com/logo.jpg",
  servesCuisine: ["Pizza", "Italiana", "Colombiana"],
  priceRange: "$$",
  openingHours: "Tu-Su 16:00-23:00",
  hasMap: "https://www.google.com/maps/dir/?api=1&destination=1.190347,-76.970656",
  location: [
    {
      "@type": "Place",
      name: "Sede Colón",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calle 2 # 6 - 15, Barrio Porvenir",
        addressLocality: "Colón",
        addressRegion: "Putumayo",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 1.190347,
        longitude: -76.970656,
      },
    },
    {
      "@type": "Place",
      name: "Sede Sibundoy",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Al lado de Comfamiliar, Barrio Castelvi",
        addressLocality: "Sibundoy",
        addressRegion: "Putumayo",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 1.2052359,
        longitude: -76.9190961,
      },
    },
  ],
  sameAs: [
    "https://www.facebook.com/saboreospizza",
    "https://www.instagram.com/saboreospizza/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <PizzaLoader />
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
