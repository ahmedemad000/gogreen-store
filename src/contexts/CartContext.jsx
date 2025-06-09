import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cartItems from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate: array of objects with id, price, name, and quantity
        if (
          Array.isArray(parsedCart) &&
          parsedCart.every(
            (item) =>
              typeof item.id === 'number' &&
              typeof item.price === 'number' &&
              typeof item.name === 'string' &&
              Number.isInteger(item.quantity) &&
              item.quantity >= 1
          )
        ) {
          console.log('Loaded cart from localStorage:', parsedCart);
          return parsedCart;
        }
        console.warn('Invalid cart data in localStorage, resetting to empty');
        localStorage.removeItem('cartItems'); // Reset corrupted data
      }
      return [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      localStorage.removeItem('cartItems'); // Reset on parse error
      return [];
    }
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Saved cart to localStorage:', cartItems);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    // Validate product and quantity
    if (
      !product ||
      typeof product.id !== 'number' ||
      typeof product.price !== 'number' ||
      typeof product.name !== 'string'
    ) {
      console.error('Invalid product for addToCart:', product);
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      console.error('Invalid quantity:', quantity);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    if (typeof productId !== 'number') {
      console.error('Invalid productId for removeFromCart:', productId);
      return;
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (typeof productId !== 'number') {
      console.error('Invalid productId for updateQuantity:', productId);
      return;
    }
    if (!Number.isInteger(newQuantity)) {
      console.error('Invalid quantity:', newQuantity);
      return;
    }
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('cartItems');
      console.log('Cleared cart from localStorage');
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}