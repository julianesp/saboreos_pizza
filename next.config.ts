import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Configuración de Turbopack
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Configuración de imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "supabase.com",
      },
      {
        protocol: "https",
        hostname: "nwxetoffoghsimkqfsbv.supabase.co",
      },
      {
        protocol: "https",
        hostname: "www.canva.com",
      },
      {
        protocol: "https",
        hostname: "0dwas2ied3dcs14f.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "ipbxcphqipulqm7d.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "vercel.com",
      },
      {
        protocol: "https",
        hostname: "media.saboreospizza.com",
      },
      {
        protocol: "https",
        hostname: "pub-2f281a1b18194582a64434d6846baf97.r2.dev",
      }
    ],
  },
};

export default nextConfig;
