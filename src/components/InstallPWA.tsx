"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // No mostrar si ya está instalada
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // No mostrar si el usuario ya la descartó
    if (localStorage.getItem("pwa-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] w-[90vw] max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 animate-[slideUp_0.4s_ease-out]">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-4 mb-4">
        <Image
          src="https://media.saboreospizza.com/logo.jpg"
          alt="Saboreos Pizza"
          width={56}
          height={56}
          className="rounded-full flex-shrink-0"
        />
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">
            Instala Saboreos Pizza
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Accede más rápido desde tu celular
          </p>
        </div>
      </div>

      <button
        onClick={handleInstall}
        className="w-full flex items-center justify-center gap-2 bg-[#029264] hover:bg-[#027a54] text-white font-semibold py-3 rounded-xl transition-colors"
      >
        <Download className="h-5 w-5" />
        Instalar app
      </button>
    </div>
  );
}
