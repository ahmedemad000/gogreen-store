import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import SustainabilityFeatures from '../components/SustainabilityFeatures';
import Testimonials from '../components/Testimonials';
import PartnersCarousel from '../components/PartnersCarousel';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedProducts />
      <PartnersCarousel />
      <SustainabilityFeatures />
      <Testimonials />
    </div>
  );
}