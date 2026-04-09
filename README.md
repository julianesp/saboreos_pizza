# 🍕 Saboreos Pizza — Sitio Web Oficial

Sitio web profesional para **Saboreos Pizza**, pizzería artesanal con dos sedes en el **Valle de Sibundoy, Putumayo, Colombia**. Desarrollado con Next.js 15, TypeScript y Tailwind CSS.

---

## ✨ Funcionalidades

### 🛒 Pedidos
- **Pedidos por WhatsApp** con mensajes predefinidos por producto
- **Barra de categorías** con acceso directo a WhatsApp por tipo de comida (Pizzas, Hamburguesas, Alitas, Mazorcadas, Sándwich Cubano, Lasaña, etc.)
- **Menú digital interactivo** con tabs por categoría, foto, descripción y precio de cada producto

### 🗺️ Información del negocio
- **Dos sedes** con Google Maps embebido y coordenadas exactas
  - Sede Colón — Calle 2 # 6-15, Barrio Porvenir
  - Sede Sibundoy — Barrio Castelvi, al lado de Comfamiliar
- Botón **"Cómo llegar"** con navegación directa en Google Maps
- Horarios, teléfono y redes sociales

### 🎨 Experiencia de usuario
- **Dark mode** con animación de barrido (ola oscura de arriba a abajo / ola clara de abajo a arriba)
- **Activación automática del modo oscuro** a partir de las 19:00 (hora de apertura)
- **Animación de zumbido** en los elementos al navegar desde el navbar
- **Loader / Splash screen** animado con pizza artesanal al cargar la página
- Diseño **100% responsive** — móvil, tablet y desktop

### ⭐ Credibilidad
- **Sección de reseñas** con testimonios de clientes y calificación promedio
- **Galería de fotos** con sliders de pizzas, otras comidas y proceso de preparación
- Secciones destacadas: Pizza del Día, La Más Pedida, Oferta Especial, Recomendación del Chef

### 🔍 SEO y rendimiento
- **Schema.org JSON-LD** — Google reconoce el negocio como restaurante con horario, dirección y coordenadas
- **Open Graph** — imagen y descripción al compartir el enlace en WhatsApp o redes sociales
- **PWA instalable** — el sitio se puede instalar como app sin pasar por Google Play
- **Vercel Analytics** y **Speed Insights** integrados
- Metadata completa (título, descripción, keywords, favicon)

---

## 🏗️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 15.5.3 | Framework principal (App Router) |
| [React](https://react.dev) | 19.1.0 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos utilitarios |
| [Sass/SCSS](https://sass-lang.com) | 1.90 | Estilos modulares |
| [Lucide React](https://lucide.dev) | 0.540 | Iconos |
| [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) | — | Almacenamiento de imágenes |
| [Vercel Analytics](https://vercel.com/analytics) | — | Métricas de uso |

---

## 📁 Estructura del proyecto

```
saboreos/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout raíz, metadata, Schema.org, ThemeProvider
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globales + dark mode
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación con dark mode toggle
│   │   ├── MenuCategoriesBar.tsx # Barra de categorías con WhatsApp
│   │   ├── DigitalMenu.tsx     # Menú digital con tabs por categoría
│   │   ├── ReviewsSection.tsx  # Reseñas de clientes
│   │   ├── LocationsSection.tsx # Sedes con Google Maps
│   │   ├── ThemeProvider.tsx   # Context de dark/light mode con animación
│   │   ├── ImageSlider.tsx     # Carrusel de imágenes
│   │   ├── FloatingFooter.tsx  # Botones flotantes (WhatsApp, redes)
│   │   ├── AnnouncementBanner.tsx # Banner de anuncios
│   │   ├── PizzaLoader.tsx     # Splash screen animado
│   │   └── ScrollToTopButton.tsx
│   ├── containers/
│   │   └── Footer.js           # Footer con info de contacto y sedes
│   ├── styles/                 # Módulos SCSS por componente
│   └── utils/
│       └── whatsapp.ts         # Generadores de links de WhatsApp
├── public/
│   ├── images/                 # Imágenes locales (pizzas, comidas, preparación)
│   └── manifest.json           # PWA manifest
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Correr en local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

```bash
# Build de producción
npm run build

# Iniciar en producción
npm start
```

---

## 📍 Sedes

| Sede | Dirección | Coordenadas |
|---|---|---|
| Colón | Calle 2 # 6-15, Barrio Porvenir | `1.190347, -76.970656` |
| Sibundoy | Al lado de Comfamiliar, Barrio Castelvi | `1.2052359, -76.9190961` |

**Horario:** Martes a Domingo, 4:00 p.m – 11:00 p.m
**WhatsApp:** [312-394-6614](https://wa.me/573123946614)

---

## 📱 Redes sociales

- [Facebook](https://www.facebook.com/saboreospizza)
- [Instagram](https://www.instagram.com/saboreospizza/)

---

## 🗺️ Roadmap

### ✅ Fase 1 — Frontend (completada)
- [x] Sitio web profesional y responsive
- [x] Menú digital por categorías
- [x] Pedidos por WhatsApp
- [x] Galería de fotos y sliders
- [x] Sección de reseñas
- [x] Sedes con Google Maps
- [x] Dark mode automático
- [x] SEO básico + Schema.org
- [x] PWA instalable

### 🔜 Fase 2 — Backend (próximamente)
- [ ] Panel de administración con login seguro
- [ ] Gestión dinámica del menú (agregar, editar, eliminar productos)
- [ ] Pizza / Plato del día editable desde el panel
- [ ] Gestión de promociones con fecha de vigencia
- [ ] Notificaciones de pedidos con alerta sonora o correo
- [ ] Gestión y moderación de reseñas
- [ ] Historial de pedidos
- [ ] Programa de fidelización (puntos por pedido)

---

*Desarrollado con ❤️ para Saboreos Pizza — El sabor único del Putumayo*
