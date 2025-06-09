import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state: orderData } = useLocation();

  // Fallback if no order data is available
  if (!orderData || !orderData.items || !orderData.shippingAddress) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Confirmation</h1>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              No order details available. Please complete the checkout process to view your order confirmation.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { items, shippingAddress, subtotal, shipping, total } = orderData;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Confirmed</h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your order! A confirmation email has been sent to {shippingAddress.email}.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-700">Items</h3>
                {items.length > 0 ? (
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No items in order</p>
                )}
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
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-lg font-medium text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
              <div className="mt-4 text-sm text-gray-600">
                <p>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</p>
                <p>{shippingAddress.address}</p>
                <p>{`${shippingAddress.city}, ${shippingAddress.zip}`}</p>
                <p>{shippingAddress.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}