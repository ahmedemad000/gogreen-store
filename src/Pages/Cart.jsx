import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PROMO_CODES = {
  'WELCOME10': { type: 'percentage', value: 10, message: '🎉 10% off your order!' },
  'SAVE20': { type: 'percentage', value: 20, message: '🔥 20% off - Great deal!' },
  'FREESHIP': { type: 'shipping', value: 100, message: '🚚 Free shipping applied!' },
  'FLAT15': { type: 'fixed', value: 15, message: '💰 $15 discount - Nice!' }
};

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    subtotal 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const shipping = subtotal > 50 ? 0 : 5.99;
  
  let discount = 0;
  let shippingDiscount = 0;

  if (appliedPromo) {
    const promo = PROMO_CODES[appliedPromo];
    
    if (promo.type === 'percentage') {
      discount = subtotal * (promo.value / 100);
    } else if (promo.type === 'fixed') {
      discount = Math.min(promo.value, subtotal);
    } else if (promo.type === 'shipping' && subtotal >= promo.value) {
      shippingDiscount = shipping;
    }
  }

  const total = subtotal + shipping - discount - shippingDiscount;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    
    if (!code) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
      toast.success(PROMO_CODES[code].message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    } else {
      setPromoError('Invalid promo code');
      toast.error('Invalid promo code', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    toast.info('Promo code removed', {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <ShoppingBag className="h-8 w-8 mr-2" />
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600">Your cart is empty</p>
            <Link
              to="/shop"
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="bg-gray-50 rounded-lg p-4 hidden lg:grid grid-cols-12 gap-4 mb-2">
                <div className="col-span-6 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700">Price</div>
                <div className="col-span-2 font-medium text-gray-700">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700">Total</div>
              </div>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="border-b border-gray-200 pb-4">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-4">
                      <div className="lg:col-span-6 flex">
                        <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link
                            to={`/shop/${item.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-green-600"
                          >
                            {item.name}
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-gray-500 hover:text-red-500 flex items-center"
                          >
                            <X className="h-4 w-4 mr-1" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:col-span-2 flex items-center">
                        <span className="text-gray-900">${item.price.toFixed(2)}</span>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:col-span-2">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="block w-full rounded-md border border-gray-300 py-1.5 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:col-span-2 flex items-center">
                        <span className="text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 rounded-md border border-gray-300 py-1.5 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        disabled={appliedPromo}
                      />
                      {!appliedPromo ? (
                        <button
                          onClick={handleApplyPromo}
                          className="cursor-pointer bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors"
                        >
                          Apply
                        </button>
                      ) : (
                        <button
                          onClick={handleRemovePromo}
                          className="cursor-pointer bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {promoError && (
                      <p className="mt-1 text-sm text-red-600">{promoError}</p>
                    )}
                    {appliedPromo && (
                      <p className="mt-1 text-sm text-green-600 font-medium">
                        Promo code applied: {appliedPromo}
                      </p>
                    )}
                  </div>

                  {(discount > 0 || shippingDiscount > 0) && (
                    <div className="border-t border-gray-200 pt-4">
                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Discount</span>
                          <span className="text-green-600">
                            -${discount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {shippingDiscount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping Discount</span>
                          <span className="text-green-600">
                            -${shippingDiscount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md shadow-sm text-center block"
                  >
                    Proceed to Checkout
                  </Link>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  or{' '}
                  <Link to="/shop" className="text-green-600 font-medium hover:text-green-500">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}