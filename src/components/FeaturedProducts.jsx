import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/Products'; // Import centralized products

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);

  const handleViewAllClick = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };

  const displayedProducts = showAll ? products : products.slice(0, 4); // show 4 products initially

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            Discover our best selling eco-friendly products
          </p>
        </div>
        
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition"
          >
            {showAll ? 'Show Less' : 'View All Products'}
          </button>
        </div>
      </div>
    </section>
  );
}