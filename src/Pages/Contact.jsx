import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', message: '' });
    setTimeout(() => setIsSuccess(false), 3000); // Hide success message after 3 seconds
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Send us a message or need help? We’re here to assist you!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-gray-600 mb-4">
                Do you have a question? A complaint? Or need help to choose the right product that fits your needs? Feel free to contact us.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-700 transition duration-300"
              >
                Send Message
              </motion.button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-4 bg-green-100 text-green-800 p-3 rounded-md text-center"
                  >
                    Thank you for your message! We will get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-green-600 text-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">We are always here to help you.</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <p>support@ecomarket.com</p>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <p>123 Green Street, Eco City, EC 12345</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm">Connect with us</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}