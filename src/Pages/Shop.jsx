import { useState,} from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/Products';
import { X } from 'lucide-react';

const categories = [
  'All',
  'Food',
  'Clothing',
  'Home',
  'Personal Care',
  'Accessories'
];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' }
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || 
                            product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const appliedFilters = [];
  if (selectedCategory !== 'All') appliedFilters.push({ type: 'category', value: selectedCategory });
  if (searchQuery) appliedFilters.push({ type: 'search', value: searchQuery });
  if (priceRange[0] !== 0 || priceRange[1] !== 500) appliedFilters.push({ type: 'price', value: `$${priceRange[0]}-$${priceRange[1]}` });
  if (minRating !== 0) appliedFilters.push({ type: 'rating', value: `${minRating} Stars & Up` });

  const removeFilter = (filter) => {
    switch (filter.type) {
      case 'category':
        setSelectedCategory('All');
        break;
      case 'search':
        setSearchQuery('');
        break;
      case 'price':
        setPriceRange([0, 500]);
        break;
      case 'rating':
        setMinRating(0);
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
    setPriceRange([0, 500]);
    setMinRating(0);
    setIsFilterOpen(false);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Eco-Friendly Products</h1>
          <div className="w-full md:w-auto flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 transition duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 transition duration-200"
              aria-label="Sort products"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200"
              aria-label={isFilterOpen ? 'Close filters' : 'Open filters'}
            >
              {isFilterOpen ? 'Close Filters' : 'Filters'}
            </button>
          </div>
        </div>

        {/* Applied Filters */}
        {appliedFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {appliedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{filter.value}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-2 focus:outline-none"
                  aria-label={`Remove ${filter.value} filter`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition duration-200"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside
            className={`md:w-1/4 bg-gradient-to-b from-green-50 to-white p-6 rounded-xl shadow-sm transition-all duration-300 ${
              isFilterOpen ? 'block' : 'hidden md:block'
            }`}
            aria-label="Filter panel"
          >
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Category</h3>
                  <nav className="mt-2 flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition duration-200 transform hover:scale-105 ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        aria-current={selectedCategory === category ? 'true' : 'false'}
                      >
                        {category}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="number"
                        min="0"
                        max="500"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = Math.max(0, Math.min(Number(e.target.value), priceRange[1]));
                          setPriceRange([value, priceRange[1]]);
                        }}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        aria-label="Minimum price"
                      />
                      <input
                        type="number"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = Math.max(priceRange[0], Math.min(Number(e.target.value), 500));
                          setPriceRange([priceRange[0], value]);
                        }}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        aria-label="Maximum price"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Minimum Rating</h3>
                  <div className="mt-2">
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition duration-200"
                      aria-label="Minimum rating"
                    >
                      <option value={0}>All</option>
                      <option value={1}>1 Star & Up</option>
                      <option value={2}>2 Stars & Up</option>
                      <option value={3}>3 Stars & Up</option>
                      <option value={4}>4 Stars & Up</option>
                    </select>
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200 transform hover:scale-105"
                  aria-label="Reset all filters"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="md:w-3/4">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="transform transition duration-200 hover:scale-105"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200"
                  aria-label="Reset filters"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}