import { Phone, MapPin, Clock, Star, Pizza, Utensils } from 'lucide-react';
import Image from 'next/image';
import ImageSlider from '../components/ImageSlider';
import FloatingFooter from '../components/FloatingFooter';

const featuredPizzas = [
  {
    id: 1,
    name: "Margarita Suprema",
    description: "Salsa de tomate artesanal, mozzarella fresca, albahaca y aceite de oliva extra virgen",
    price: "$18.990",
    image: "🍕",
    rating: 4.8
  },
  {
    id: 2,
    name: "Pepperoni Clásica",
    description: "Generosas rodajas de pepperoni, mozzarella derretida y orégano fresco",
    price: "$21.990",
    image: "🍕",
    rating: 4.9
  },
  {
    id: 3,
    name: "Hawaiana Gourmet",
    description: "Jamón premium, piña tropical, mozzarella y un toque de cilantro",
    price: "$22.990",
    image: "🍕",
    rating: 4.7
  }
];

const mostPopular = {
  name: "Quattro Formaggi",
  description: "Una deliciosa mezcla de mozzarella, gorgonzola, parmesano y provolone con nueces",
  price: "$25.990",
  image: "🧀",
  rating: 4.9,
  orders: "152 pedidos esta semana"
};

const whatsappNumber = "3177694172";

const createWhatsAppMessage = (pizzaName: string, price: string) => {
  const message = `¡Hola! Me interesa ordenar una pizza *${pizzaName}* (${price}). ¿Podrían ayudarme con el pedido?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const generalWhatsAppMessage = () => {
  const message = "¡Hola! Me gustaría hacer un pedido de pizza. ¿Podrían ayudarme?";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

// Image data for sliders
const imageCategories = {
  pizza: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  comidas: ['1', '2', '3', '4'],
  preparacion: ['1', '2', '3', '4', '5']
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              

              <Image
              src="https://0dwas2ied3dcs14f.public.blob.vercel-storage.com/Business/Saboreos%20pizza/logo.jpg"
              alt='logo'
              width={60}
              height={60}
              />

              <h1 className="text-2xl font-bold text-gray-900">Saboreos Pizza</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#inicio" className="text-gray-700 hover:text-emerald-600 transition-colors">Inicio</a>
              <a href="#destacadas" className="text-gray-700 hover:text-emerald-600 transition-colors">Pizzas</a>
              <a href="#contacto" className="text-gray-700 hover:text-emerald-600 transition-colors">Contacto</a>
              <a 
                href={generalWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Pedir Ahora
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="py-6 px-4 sm:px-6 lg:px-8">
        <ImageSlider 
              images={imageCategories.pizza}
              category="pizza"
              title="Nuestras Deliciosas Pizzas"
              autoplayInterval={4000}
            />
        {/* Image Sliders */}
          <div className="mb-8 space-y-8">
            
            
            
            
            
          </div>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bienvenido a <span className="text-emerald-600">Saboreos Pizza</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Donde cada pizza es una obra maestra. Ingredientes frescos, recetas tradicionales y el amor por la auténtica cocina italiana se encuentran en cada bocado.
          </p>
          
          
          
          <a 
            href="#destacadas"
            className="bg-emerald-600 text-white px-8 py-4 text-lg rounded-lg hover:bg-emerald-700 transition-colors shadow-lg inline-block"
          >
            Ver Nuestras Pizzas
          </a>
        </div>

        <div className="flex items-center space-x-2 py-6">

        <ImageSlider 
              images={imageCategories.comidas}
              category="comidas"
              title="Otras Especialidades"
              autoplayInterval={5000}
            />
        </div>
      </section>

      {/* Pizza Más Popular */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">🏆 La Más Pedida</h3>
            <p className="text-gray-600">{mostPopular.orders}</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4">{mostPopular.image}</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{mostPopular.name}</h4>
                <p className="text-gray-600 mb-4">{mostPopular.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">({mostPopular.rating})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-emerald-600">{mostPopular.price}</span>
                  <a 
                    href={createWhatsAppMessage(mostPopular.name, mostPopular.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors inline-block"
                  >
                    Pedir por WhatsApp
                  </a>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pizzas Destacadas del Día</h3>
            <p className="text-gray-600">Nuestras especialidades más populares, preparadas con ingredientes frescos y de la más alta calidad</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPizzas.map((pizza) => (
              <div key={pizza.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="text-4xl text-center mb-4">{pizza.image}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pizza.name}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{pizza.description}</p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({pizza.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">{pizza.price}</span>
                    <a 
                      href={createWhatsAppMessage(pizza.name, pizza.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm inline-block"
                    >
                      Pedir por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Utensils className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Ingredientes Frescos</h4>
            <p className="text-gray-300">Seleccionamos solo los mejores ingredientes locales para nuestras pizzas</p>
          </div>
          <div>
            <Clock className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Entrega Rápida</h4>
            <p className="text-gray-300">Delivery en 30 minutos o menos a toda la ciudad</p>
          </div>
          <div>
            <Star className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Calidad Garantizada</h4>
            <p className="text-gray-300">Más de 15 años perfeccionando nuestras recetas tradicionales</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Pizza className="h-8 w-8 text-emerald-400" />
                <h3 className="text-2xl font-bold">Saboreos Pizza</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Desde 2008, hemos sido la pizzería de confianza para las familias de nuestra ciudad. 
                Ofrecemos auténticas pizzas italianas con un toque chileno, preparadas con ingredientes 
                frescos y mucho amor. Nuestro compromiso es brindar la mejor experiencia gastronómica 
                en cada pedido.
              </p>
              <p className="text-gray-300">
                ¡Ven y descubre por qué somos la pizzería favorita de la ciudad!
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">+56 9 8765 4321</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">Av. Principal 1234, Santiago</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">Lun-Dom: 11:00 - 23:00</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Síguenos</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">Facebook</a>
                <a href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">Instagram</a>
                <a 
                  href={generalWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Saboreos Pizza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating Footer */}
      <FloatingFooter />
    </div>
  );
}
