import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/productService'; // To get all products
import { deleteProductByAdmin } from '../../api/adminService'; // To delete a product
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts({ limit: 100 }); // Fetch up to 100 products
      setProducts(data.products);
    } catch (error) {
      toast.error("Could not fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      try {
        await deleteProductByAdmin(id);
        toast.success('Product deleted successfully');
        loadProducts(); // Refresh the list
      } catch (error) {
        toast.error('Failed to delete product.');
      }
    }
  };

  if (loading) return <p className="text-white">Loading products...</p>;

  return (
    <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Products ({products.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-lavender/20">
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-b border-lavender/10 text-lavender/90">
                <td className="p-3">
                    <img src={product.images[0]} alt={product.title} className="w-12 h-12 rounded-md object-cover" />
                </td>
                <td className="p-3 font-semibold text-white">{product.title}</td>
                <td className="p-3">₹{product.rentalPrice}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">
                  <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;