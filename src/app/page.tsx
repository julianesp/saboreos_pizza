import { Phone, MapPin, Clock, Star, Pizza, Utensils } from 'lucide-react';
import ImageSlider from '../components/ImageSlider';
import FloatingFooter from '../components/FloatingFooter';
import Navbar from '../components/Navbar';
import { createWhatsAppMessage, generalWhatsAppMessage } from '../utils/whatsapp';
import Link from 'next/link';

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



// Image data for sliders
const imageCategories = {
  pizza: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  comidas: ['1', '2', '3', '4'],
  preparacion: ['1', '2', '3', '4', '5']
};

export default function Home() {
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
            Bienvenido a <span className="text-emerald-600">Saboreos Pizza</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Donde cada pizza es una obra maestra. Ingredientes frescos, recetas tradicionales y el amor por la auténtica cocina italiana se encuentran en cada bocado.
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
                  <Link 
                    href={createWhatsAppMessage(mostPopular.name, mostPopular.price)}
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Pizzas Destacadas del Día</h3>
            <p className="text-gray-600">Nuestras especialidades más populares, preparadas con ingredientes frescos y de la más alta calidad</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 ">
            {featuredPizzas.map((pizza) => (
              <div key={pizza.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 duration-200 ease-in-out">
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

      {/* Información Adicional */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <Utensils className="h-12 w-12 text-emerald-400 mx-auto mb-4 hover:-scale-x-100 transition-normal duration-500 delay-100 hover:rotate-45" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">Ingredientes Frescos</h4>
            <p className="text-gray-100">Seleccionamos solo los mejores ingredientes de la región para nuestras pizzas</p>
          </div>
          <div>
            <Clock className="h-12 w-12 text-emerald-400 mx-auto mb-4 transition-normal duration-500 delay-100 hover:rotate-180" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">Entrega Rápida</h4>
            <p className="text-gray-100">Entrega a domicilio para Santiago, Colón, San Pedro, Sibundoy y San Francisco</p>
          </div>
          <div>
            <Star className="h-12 w-12 text-emerald-400 mx-auto mb-4  transition-normal duration-500 delay-100 hover:rotate-180" />
            <h4 className="text-xl font-bold mb-2 underline underline-offset-4">Calidad Garantizada</h4>
            <p className="text-gray-100">Más de 10 años perfeccionando nuestras recetas tradicionales</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Pizza className="h-8 w-8 text-emerald-400" />
                <h3 className="text-2xl font-bold">Saboreos Pizza</h3>
              </div>
              <p className="text-white mb-4">
                El sabor único del Putumayo en cada bocado. Preparamos pizzas artesanales con salsa de la casa, masa casera y queso de la región, acompañadas de una gran variedad de ingredientes frescos.
                Además, disfruta de lasaña, hamburguesas, salchipapas, sándwich cubano, mazorcadas, alitas, platos a la carta y recetas tradicionales por encargo.
                También atendemos recepciones y pedidos especiales.                
              </p>
              <p className='text-white'>👉 En Saboreos, cada plato es una experiencia que combina tradición y sabor auténtico.</p>
              
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">+57 3177694172</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">Colón, Putumayo</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-emerald-400" />
                  <span className="text-gray-300">Martes-Domingo: 04:00 p.m - 11:00 p.m</span>                  
                </div>                
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Síguenos</h4>
              <div className="space-y-2">
                <Link href="https://www.facebook.com/saboreospizza" className="block text-gray-300 hover:text-emerald-400 transition-colors" target='_blank'>Facebook</Link>

                <Link href="https://www.instagram.com/saboreospizza/" target='_blank' className="block text-gray-300 hover:text-emerald-400 transition-colors">Instagram</Link>

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
