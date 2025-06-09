import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Bell, Plus, Image as ImageIcon, Filter, X, LogOut } from 'lucide-react';
import { products } from '../data/Products';

// Derive categories from Products.js
const categories = [...new Set(products.map((p) => p.category))].map((name, index) => ({
  id: index + 1,
  name,
}));

// Simulated notifications
const initialNotifications = [
  { id: 1, supplier_id: 1, message: "Product 'Organic Soap' rejected: Incomplete description.", created_at: "2025-06-08T23:07:53Z" },
  { id: 2, supplier_id: 1, message: "Product 'Reusable Straw' rejected: Invalid price.", created_at: "2025-06-08T23:07:53Z" },
  { id: 3, supplier_id: 1, message: "Product 'Bamboo Toothbrush' pending review.", created_at: "2025-06-09T10:15:22Z" },
  { id: 4, supplier_id: 1, message: "Product 'Eco Bag' approved!", created_at: "2025-06-09T12:30:00Z" },
];

// Simulated initial supplier products
const initialSupplierProducts = [
  { id: 1, name: 'Organic Soap', price: 5.99, category_name: 'Personal Care', partnerName: 'GreenEco Supplies', approval_status: 'rejected', stock: 50, description: 'Natural soap with organic ingredients.', image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Reusable Straw', price: 2.49, category_name: 'Kitchen', partnerName: 'EcoLiving', approval_status: 'pending', stock: 100, description: 'Durable stainless steel straw.', image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Bamboo Toothbrush', price: 3.99, category_name: 'Personal Care', partnerName: 'GreenEco Supplies', approval_status: 'approved', stock: 75, description: 'Eco-friendly toothbrush.', image: 'https://via.placeholder.com/50' },
];

export default function SupplierDashboard() {
  const [supplierProducts, setSupplierProducts] = useState([]);
  const [notifications] = useState(initialNotifications);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    partnerName: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load from localStorage on mount, fallback to initial data
  useEffect(() => {
    const savedProducts = localStorage.getItem('supplierProducts');
    if (savedProducts) {
      setSupplierProducts(JSON.parse(savedProducts));
    } else {
      setSupplierProducts(initialSupplierProducts);
    }
  }, []);

  // Save to localStorage whenever supplierProducts changes
  useEffect(() => {
    localStorage.setItem('supplierProducts', JSON.stringify(supplierProducts));
  }, [supplierProducts]);

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name.trim()) newErrors.name = 'Product name is required';
    if (!newProduct.description.trim()) newErrors.description = 'Description is required';
    if (!newProduct.price || Number(newProduct.price) <= 0) newErrors.price = 'Valid price is required';
    if (!newProduct.stock || Number(newProduct.stock) < 0) newErrors.stock = 'Valid stock is required';
    if (!newProduct.category_id) newErrors.category_id = 'Category is required';
    if (!newProduct.partnerName.trim()) newErrors.partnerName = 'Supplier name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const productEntry = {
      id: supplierProducts.length + 1,
      name: newProduct.name,
      price: Number(newProduct.price),
      category_name: categories.find((c) => c.id === Number(newProduct.category_id))?.name || 'Unknown',
      partnerName: newProduct.partnerName,
      approval_status: 'pending',
      stock: Number(newProduct.stock),
      description: newProduct.description,
      image: newProduct.image || 'https://via.placeholder.com/50',
    };
    setSupplierProducts((prev) => [...prev, productEntry]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      partnerName: '',
      image: null,
    });
    setImagePreview(null);
    setErrors({});
    setShowModal(false);
    toast.success('Product request submitted!');
  };

  // Format date to "DD/MM/YYYY, HH:MM:SS"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$1/$2/$3');
  };

  // Filtered products based on category
  const filteredProducts = filterCategory
    ? supplierProducts.filter((p) => p.category_name === categories.find((c) => c.id === Number(filterCategory))?.name)
    : supplierProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-500 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Norskk Supplier Portal</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-6 w-6 cursor-pointer" onClick={() => setShowNotifications(!showNotifications)} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg p-2 z-10"
                >
                  {notifications.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-2 bg-gray-100 rounded-md">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(notification.created_at)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-center">No notifications.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => alert('Logout clicked! Implement logout logic here.')}
            className="px-3 py-1 bg-red-600 text-white rounded-md flex items-center"
          >
            <LogOut className="h-5 w-5 mr-1" /> Logout
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex p-6">
        {/* Sidebar for Filtering */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white shadow-md rounded-lg p-4 mr-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Filter className="h-5 w-5 mr-2 text-green-600" /> Filters
          </h2>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Main Dashboard */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-6">
            {/* Add Product Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Product
              </motion.button>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Submitted Products</h2>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-gray-50 p-4 rounded-md shadow-sm flex items-center space-x-4 cursor-pointer hover:bg-gray-100"
                    >
                      <img src={product.image} alt={`${product.name} image`} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="text-gray-800 font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            product.approval_status === 'pending'
                              ? 'bg-yellow-200 text-yellow-800'
                              : product.approval_status === 'approved'
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}
                        >
                          {product.approval_status.charAt(0).toUpperCase() + product.approval_status.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center">No products submitted.</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h3>
              <form onSubmit={handleSubmitProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="e.g., Organic T-Shirt"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    rows="3"
                    placeholder="Enter a brief description, e.g., Made from organic cotton"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                      className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                      placeholder="e.g., $12.99"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
                      className={`mt-1 block w-full px-3 py-2 border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                      placeholder="e.g., 100 units"
                      min="0"
                    />
                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newProduct.category_id}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, category_id: e.target.value }))}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                  <input
                    type="text"
                    value={newProduct.partnerName}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, partnerName: e.target.value }))}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.partnerName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="e.g., GreenEco Supplies"
                  />
                  {errors.partnerName && <p className="text-red-500 text-sm mt-1">{errors.partnerName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />
                  )}
                </div>
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setErrors({});
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50, scale: 0.8 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Details</h3>
              <div className="space-y-4">
                <p><strong>Name:</strong> {selectedProduct.name}</p>
                <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
                <p><strong>Stock:</strong> {selectedProduct.stock} units</p>
                <p><strong>Category:</strong> {selectedProduct.category_name}</p>
                <p><strong>Supplier:</strong> {selectedProduct.partnerName}</p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
                <p><strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedProduct.approval_status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : selectedProduct.approval_status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {selectedProduct.approval_status.charAt(0).toUpperCase() + selectedProduct.approval_status.slice(1)}
                  </span>
                </p>
                {selectedProduct.image && (
                  <img src={selectedProduct.image} alt={`${selectedProduct.name} image`} className="mt-2 h-24 w-24 rounded-lg object-cover" />
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}