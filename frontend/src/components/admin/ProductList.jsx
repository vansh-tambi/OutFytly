import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../api/productService';
import { deleteProductByAdmin } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      // Fetch a large number of products for the admin view
      const data = await fetchProducts({ limit: 200 }); 
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

  if (loading) {
    return (
        <div className="flex justify-center items-center p-10">
            <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-plum/30 p-4 sm:p-6 rounded-xl border border-lavender/20">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Products ({products.length})</h2>
      
      {/* --- Mobile Card View --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {products.map(product => (
          <div key={product._id} className="bg-ink p-4 rounded-lg border border-lavender/20 flex flex-col">
            <div className="flex gap-4">
              <img src={product.images[0]} alt={product.title} className="w-16 h-16 rounded-md object-cover" />
              <div className="flex-grow">
                <p className="font-bold text-white">{product.title}</p>
                <p className="text-sm text-primary">₹{product.rentalPrice}</p>
                <p className="text-xs text-lavender/70">{product.category}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-lavender/20 flex justify-end">
              <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Desktop Table View --- */}
      <div className="overflow-x-auto hidden md:block">
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