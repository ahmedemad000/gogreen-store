import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  const [aboutData, setAboutData] = useState({
    mission: "We're on a mission to make sustainable living accessible to everyone.",
    history: "Founded in 2023, EcoMarket began as a small local initiative and has grown into a trusted source for eco-friendly products.",
    values: "Our team carefully selects each product based on its environmental impact, ethical production, and quality. We believe small changes in our daily habits can lead to big impacts on our planet's health."
  });
  const [teamImages] = useState([
    "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1087735/pexels-photo-1087735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [testimonial] = useState({
    quote: "EcoMarket has transformed how I shop—sustainable and high-quality!",
    author: "Jane Doe, Eco Enthusiast"
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % teamImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + teamImages.length) % teamImages.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            About EcoMarket
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our journey towards a sustainable future.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 lg:mb-0"
          >
            <p className="text-lg text-gray-600 mb-4">{aboutData.mission}</p>
            <div className="space-y-4 text-gray-600">
              <p>{aboutData.history}</p>
              <p>{aboutData.values}</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                to="/shop"
                className="inline-block bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Our Products
              </Link>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 bg-green-50 p-4 rounded-lg shadow-inner"
            >
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="text-right text-green-600 font-semibold mt-2">- {testimonial.author}</p>
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={teamImages[currentImageIndex]}
              alt="Our team"
              className="w-full rounded-lg shadow-md"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/1000x600?text=Image+Not+Available'; }}
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition duration-300"
            >
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition duration-300"
            >
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}