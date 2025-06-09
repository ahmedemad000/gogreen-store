import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/Products';
import { useCart } from '../contexts/CartContext';
import { useReviews } from '../contexts/ReviewsContext';
import { Star, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));
  const { addToCart } = useCart();
  const { addReview, getReviewsForProduct, getAverageRating, getReviewCount } = useReviews();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <Link
          to="/shop"
          className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5 stars.');
      return;
    }
    const success = addReview(product.id, rating, comment);
    if (success) {
      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } else {
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const reviews = getReviewsForProduct(product.id);
  const averageRating = getAverageRating(product.id);
  const reviewCount = getReviewCount(product.id);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-600 transition duration-200">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/shop" className="hover:text-green-600 transition duration-200">
            Shop
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="md:flex md:gap-8">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl shadow-sm"
            />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl text-green-600 mt-2">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">Details</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200 transform hover:scale-105"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <div className="flex items-center">
                {averageRating > 0 ? (
                  <>
                    <span className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={i < Math.round(averageRating) ? 'currentColor' : 'none'}
                          stroke={i < Math.round(averageRating) ? 'none' : 'currentColor'}
                        />
                      ))}
                    </span>
                    <span className="ml-2 text-gray-600">
                      {averageRating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                  </>
                ) : (
                  <span className="text-gray-600">No reviews yet</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          {/* Review Form */}
          <form onSubmit={handleSubmitReview} className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                      aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={24}
                        fill={
                          starValue <= (hoveredRating || rating)
                            ? '#facc15'
                            : 'none'
                        }
                        stroke={
                          starValue <= (hoveredRating || rating)
                            ? 'none'
                            : '#facc15'
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Comment (optional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 transition duration-200"
                rows={4}
                placeholder="Share your thoughts about the product..."
                aria-label="Review comment"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200 transform hover:scale-105"
              aria-label="Submit review"
            >
              Submit Review
            </button>
          </form>

          {/* Review List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                          stroke={i < review.rating ? 'none' : 'currentColor'}
                        />
                      ))}
                    </span>
                    <span className="ml-2 text-gray-600 text-sm">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-600">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
}