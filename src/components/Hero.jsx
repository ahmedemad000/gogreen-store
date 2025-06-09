import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data with fallback images
const mockProducts = [
  { id: 1, name: 'Organic T-Shirt', image: 'https://images.pexels.com/photos/7475382/pexels-photo-7475382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', price: 29.99 },
  { id: 2, name: 'Eco-Friendly Notebook', image: 'https://images.pexels.com/photos/8250885/pexels-photo-8250885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', price: 9.99 },
  { id: 3, name: 'Reusable Water Bottle', image: 'https://images.pexels.com/photos/12115338/pexels-photo-12115338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', price: 19.99 },
];

export default function Hero() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % mockProducts.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % mockProducts.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + mockProducts.length) % mockProducts.length);
  };

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="block"
              >
                Sustainable Living
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block text-green-700"
              >
                Starts Here
              </motion.span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 sm:text-xl max-w-xl mx-auto lg:mx-0">
              Explore our premium range of organic and eco-conscious products designed to enhance your lifestyle while protecting the planet.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#shop"
                className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition duration-300"
              >
                Shop Now
              </a>
              <a
                href="#learn"
                className="inline-flex items-center px-6 py-3 bg-white text-green-700 font-semibold rounded-lg border border-green-700 hover:bg-green-50 transition duration-300"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Product Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src={mockProducts[currentProductIndex].image}
                alt={mockProducts[currentProductIndex].name}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available'; }}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl sm:text-2xl font-bold">{mockProducts[currentProductIndex].name}</h3>
                  <p className="text-lg sm:text-xl">${mockProducts[currentProductIndex].price.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
            <button
              onClick={prevProduct}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-green-700" />
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition duration-300"
            >
              <ChevronRight className="h-6 w-6 text-green-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}