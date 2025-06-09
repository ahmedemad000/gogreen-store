import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist', { position: 'top-center', autoClose: 2000 });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!', { position: 'top-center', autoClose: 2000 });
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
        {product.isNew && (
          <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded">
            Best Seller
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleWishlistToggle}
          className={`p-2 rounded-full transition-colors ${
            inWishlist ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-white hover:bg-gray-100'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500' : ''}`} />
        </button>
      </div>
      <Link to={`/shop/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="mt-1 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <p className="mt-2 text-base font-semibold text-green-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center text-sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}