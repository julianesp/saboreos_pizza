import Image from 'next/image';
import { generalWhatsAppMessage } from '../utils/whatsapp';

const Navbar = () => {
  return (
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
            <a href="#especialidades" className="text-gray-700 hover:text-emerald-600 transition-colors">Especialidades</a>
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
  );
};

export default Navbar;