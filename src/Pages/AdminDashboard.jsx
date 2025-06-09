import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Settings, Layout, List, FileText, Users, BarChart2, Check, X, Pencil, Trash2, Eye, Plus, LogOut } from 'lucide-react';
import { products } from '../data/Products';

// Simulated data
const initialReviews = {
  1: [
    { id: 1, product_id: 1, product_name: products.find(p => p.id === 1)?.name || 'Unknown', rating: 4, comment: 'Soft and eco-friendly!' },
    { id: 2, product_id: 1, product_name: products.find(p => p.id === 1)?.name || 'Unknown', rating: 5, comment: 'Perfect fit!' },
  ],
  2: [
    { id: 3, product_id: 2, product_name: products.find(p => p.id === 2)?.name || 'Unknown', rating: 3, comment: 'Good but bristles wear out fast.' },
  ],
  3: [
    { id: 4, product_id: 3, product_name: products.find(p => p.id === 3)?.name || 'Unknown', rating: 4, comment: 'Keeps water cold all day!' },
  ],
  4: [
    { id: 5, product_id: 4, product_name: products.find(p => p.id === 4)?.name || 'Unknown', rating: 5, comment: 'Lovely scent!' },
  ],
  5: [
    { id: 6, product_id: 5, product_name: products.find(p => p.id === 5)?.name || 'Unknown', rating: 4, comment: 'Very sturdy bag.' },
  ],
};

const initialPendingProducts = [
  { id: 9, name: 'Eco-Friendly Notebook', price: 9.99, stock: 400, category_name: 'Accessories', partnerName: 'GreenPages', description: 'Recycled paper notebook with biodegradable cover', image: 'https://i.pinimg.com/736x/13/48/9c/13489ce8e1ede4630f4ab29b1a338fa0.jpg' },
  { id: 10, name: 'Organic Coffee Beans', price: 14.99, stock: 600, category_name: 'Food', partnerName: 'FairBrew', description: 'Fair-trade organic coffee beans, 500g package', image: 'https://i.pinimg.com/736x/be/a3/12/bea31296162a1c6d82f7cfa90a14d60b.jpg' },
];

export default function AdminDashboard() {
  const [pendingProducts, setPendingProducts] = useState(initialPendingProducts);
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReview, setEditingReview] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [filter, setFilter] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: 0, category_name: '', partnerName: '', description: '', image: 'https://via.placeholder.com/50' });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleApproveProduct = (productId) => {
    setPendingProducts((prev) => prev.filter((p) => p.id !== productId));
    setViewProduct(null);
    toast.success('Product approved!');
  };

  const handleRejectProduct = (productId) => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a rejection reason.');
      return;
    }
    setPendingProducts((prev) => prev.filter((p) => p.id !== productId));
    setViewProduct(null);
    setRejectReason('');
    toast.success(`Product rejected: ${rejectReason}`);
  };

  const handleEditReview = (e) => {
    e.preventDefault();
    const updatedReview = {
      rating: Number(e.target.rating.value),
      comment: e.target.comment.value,
    };
    setReviews((prev) => {
      const newReviews = { ...prev };
      Object.keys(newReviews).forEach((productId) => {
        newReviews[productId] = newReviews[productId].map((review) =>
          review.id === editingReview.id ? { ...review, ...updatedReview } : review
        );
      });
      return newReviews;
    });
    setEditingReview(null);
    toast.success('Review updated successfully!');
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prev) => {
      const newReviews = { ...prev };
      Object.keys(newReviews).forEach((productId) => {
        newReviews[productId] = newReviews[productId].filter((review) => review.id !== reviewId);
      });
      return newReviews;
    });
    toast.success('Review deleted successfully!');
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProductEntry = {
      id: pendingProducts.length + 9,
      ...newProduct,
    };
    setPendingProducts((prev) => [...prev, newProductEntry]);
    setNewProduct({ name: '', price: '', stock: 0, category_name: '', partnerName: '', description: '', image: 'https://via.placeholder.com/50' });
    setShowCreateModal(false);
    toast.success('Product created successfully!');
  };

  const filteredProducts = pendingProducts.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleLogout = () => {
    // Simulate logout by clearing session data and redirecting
    toast.success('Logged out successfully!');
    // Note: In a real app, replace with actual logout logic (e.g., clearing tokens and redirecting)
    setTimeout(() => window.location.href = '/login', 1000); // Example redirect
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-64 bg-green-700 text-white p-4 flex flex-col space-y-4"
      >
        <div className="text-xl font-bold mb-6">Norskk Admin</div>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <User className="mr-2 h-5 w-5" /> Profile
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <Settings className="mr-2 h-5 w-5" /> Control Panel
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <Layout className="mr-2 h-5 w-5" /> Projects
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <List className="mr-2 h-5 w-5" /> Tasks
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <FileText className="mr-2 h-5 w-5" /> Logs
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <Users className="mr-2 h-5 w-5" /> Group Chats
        </a>
        <a href="#" className="flex items-center p-2 hover:bg-green-600 rounded">
          <BarChart2 className="mr-2 h-5 w-5" /> Reports
        </a>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-green-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search products..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded text-black "
              aria-label="Search products"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Luke Aasote Admin</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                LA
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
              aria-label="Logout"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </motion.button>
          </div>
        </div>

        {/* Main Section */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Pending Products */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Pending Product Requests</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                aria-label="Create new product"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </motion.button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <img src={product.image} alt={`${product.name} image`} className="h-10 w-10 rounded-full object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.partnerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pending</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setViewProduct(product)}
                          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          aria-label={`View ${product.name}`}
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleApproveProduct(product.id)}
                          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                          aria-label={`Approve ${product.name}`}
                        >
                          <Check className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            const reason = prompt('Enter rejection reason:');
                            if (reason) handleRejectProduct(product.id, reason);
                          }}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          aria-label={`Reject ${product.name}`}
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Reviews Management */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Manage Reviews</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.values(reviews).flat().map((review) => (
                    <motion.tr
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{review.rating} Stars</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{review.comment || 'No comment'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setEditingReview(review)}
                          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          aria-label={`Edit review for ${review.product_name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          aria-label={`Delete review for ${review.product_name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Product Detail Modal */}
          <AnimatePresence>
            {viewProduct && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{viewProduct.name}</h3>
                  <img src={viewProduct.image} alt={`${viewProduct.name} image`} className="h-24 w-24 rounded-lg mb-4 object-cover" />
                  <p className="text-gray-700 mb-2"><strong>Price:</strong> ${viewProduct.price.toFixed(2)}</p>
                  <p className="text-gray-700 mb-2"><strong>Stock:</strong> {viewProduct.stock}</p>
                  <p className="text-gray-700 mb-2"><strong>Category:</strong> {viewProduct.category_name}</p>
                  <p className="text-gray-700 mb-2"><strong>Supplier:</strong> {viewProduct.partnerName}</p>
                  <p className="text-gray-700 mb-4"><strong>Description:</strong> {viewProduct.description}</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rejection Reason (if rejecting)</label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      rows="3"
                      aria-label="Rejection reason"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApproveProduct(viewProduct.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      aria-label={`Approve ${viewProduct.name}`}
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRejectProduct(viewProduct.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      aria-label={`Reject ${viewProduct.name}`}
                    >
                      Reject
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewProduct(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                      aria-label="Close modal"
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Review Modal */}
          <AnimatePresence>
            {editingReview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Review</h3>
                  <form onSubmit={handleEditReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <select
                        name="rating"
                        defaultValue={editingReview.rating}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        aria-label="Select rating"
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <option key={star} value={star}>
                            {star} Star{star > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Comment</label>
                      <textarea
                        name="comment"
                        defaultValue={editingReview.comment}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        rows="4"
                        aria-label="Edit comment"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setEditingReview(null)}
                        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                        aria-label="Cancel edit"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="Save review changes"
                      >
                        Save
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create Product Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Product</h3>
                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Organic T-Shirt"
                        aria-label="Product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., $12.99"
                        aria-label="Product price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., 100 units"
                        min="0"
                        aria-label="Product stock"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        value={newProduct.category_name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, category_name: e.target.value }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., Clothing"
                        aria-label="Product category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Supplier</label>
                      <input
                        type="text"
                        value={newProduct.partnerName}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, partnerName: e.target.value }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="e.g., GreenEco Supplies"
                        aria-label="Product supplier"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        rows="3"
                        placeholder="Enter a brief description, e.g., Made from organic cotton"
                        aria-label="Product description"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
                        aria-label="Cancel create"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="Create product"
                      >
                        Create
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}