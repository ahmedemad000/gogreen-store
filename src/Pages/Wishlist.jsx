import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Trash2, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, wishlistCount, setWishlistItems } = useWishlist();
  const { cartItems, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMoveAllToCart = () => {
    if (wishlistItems.length === 0) return;
    setIsModalOpen(true);
  };

  const handleConfirmMoveAndClear = () => {
    let addedCount = 0;
    let updatedCount = 0;

    wishlistItems.forEach((wishlistItem) => {
      const existingItem = cartItems.find((cartItem) => cartItem.id === wishlistItem.id);
      const productToAdd = { ...wishlistItem, quantity: 1 };
      if (existingItem) {
        addToCart({ ...wishlistItem, quantity: existingItem.quantity + 1 });
        updatedCount++;
      } else {
        addToCart(productToAdd);
        addedCount++;
      }
    });

    const totalAffected = addedCount + updatedCount;
    toast.success(
      `${totalAffected} item(s) affected in cart! (${addedCount} added, ${updatedCount} updated)`,
      { position: 'top-center', autoClose: 2000 }
    );

    setWishlistItems([]);
    toast.info('Wishlist cleared', { position: 'top-center', autoClose: 2000 });
    setIsModalOpen(false);
    // Add a slight delay to ensure state updates before navigation
    setTimeout(() => navigate('/wishlist'), 100);
  };

  const handleMoveWithoutClearing = () => {
    let addedCount = 0;
    let updatedCount = 0;

    wishlistItems.forEach((wishlistItem) => {
      const existingItem = cartItems.find((cartItem) => cartItem.id === wishlistItem.id);
      const productToAdd = { ...wishlistItem, quantity: 1 };
      if (existingItem) {
        addToCart({ ...wishlistItem, quantity: existingItem.quantity + 1 });
        updatedCount++;
      } else {
        addToCart(productToAdd);
        addedCount++;
      }
    });

    const totalAffected = addedCount + updatedCount;
    toast.success(
      `${totalAffected} item(s) affected in cart! (${addedCount} added, ${updatedCount} updated)`,
      { position: 'top-center', autoClose: 2000 }
    );
    setIsModalOpen(false);
    // Navigate to wishlist page
    navigate('/wishlist');
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        <p className="mt-2 text-sm text-gray-600">
          {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in your wishlist
        </p>

        {wishlistItems.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">Your wishlist is empty.</p>
            <Link
              to="/shop"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleMoveAllToCart}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center text-sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Move All to Cart
              </button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-48 w-full object-cover object-center"
                    />
                  </Link>
                  <div className="p-4 flex-grow">
                    <Link to={`/shop/${item.id}`}>
                      <h2 className="text-sm font-medium text-gray-900 truncate">{item.name}</h2>
                    </Link>
                    <p className="mt-2 text-base font-semibold text-green-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.success('Added to cart!', { position: 'top-center', autoClose: 2000 });
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        removeFromWishlist(item.id);
                        toast.info('Removed from wishlist', { position: 'top-center', autoClose: 2000 });
                      }}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleMoveWithoutClearing}
          onConfirm={handleConfirmMoveAndClear}
          title="Move All to Cart"
          message="Move all items to cart? Would you like to clear your wishlist after moving?"
        />
      </div>
    </div>
  );
}