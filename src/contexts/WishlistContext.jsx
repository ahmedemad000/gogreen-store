import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Initialize wishlistItems from localStorage or empty array
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlistItems');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Validate: array of objects with id and name
        if (
          Array.isArray(parsedWishlist) &&
          parsedWishlist.every(
            (item) => typeof item.id === 'number' && typeof item.name === 'string'
          )
        ) {
          console.log('Loaded wishlist from localStorage:', parsedWishlist);
          return parsedWishlist;
        }
        console.warn('Invalid wishlist data in localStorage, resetting to empty');
        localStorage.removeItem('wishlistItems'); // Reset corrupted data
      }
      return [];
    } catch (error) {
      console.error('Error parsing wishlist from localStorage:', error);
      localStorage.removeItem('wishlistItems'); // Reset on parse error
      return [];
    }
  });

  // Save wishlistItems to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
      console.log('Saved wishlist to localStorage:', wishlistItems);
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    // Validate product
    if (
      !product ||
      typeof product.id !== 'number' ||
      typeof product.name !== 'string'
    ) {
      console.error('Invalid product for addToWishlist:', product);
      return;
    }
    setWishlistItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        console.log('Product already in wishlist:', product.id);
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    if (typeof productId !== 'number') {
      console.error('Invalid productId for removeFromWishlist:', productId);
      return;
    }
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    try {
      localStorage.removeItem('wishlistItems');
      console.log('Cleared wishlist from localStorage');
    } catch (error) {
      console.error('Error clearing wishlist from localStorage:', error);
    }
  };

  const isInWishlist = (productId) => {
    if (typeof productId !== 'number') {
      console.warn('Invalid productId for isInWishlist:', productId);
      return false;
    }
    return wishlistItems.some((item) => item.id === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}