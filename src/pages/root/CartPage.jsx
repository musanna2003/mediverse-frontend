import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAuth from '../../Context/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const fetchCartItems = async (email) => {
  const res = await axiosSecure.get('https://ph-assignment-12-backend.vercel.app/cart', {
    params: { email },
  });
  return res.data;
};

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedIds, setSelectedIds] = useState([]);
  const [quantities, setQuantities] = useState({});

  const { data: cartItems = [], isLoading, isError, refetch, } = useQuery({
    queryKey: ['cartItems', user?.email],
    queryFn: () => fetchCartItems(user.email),
    enabled: !!user?.email,
  });

  // Initialize quantities when cart items load
  useEffect(() => {
    if (cartItems.length) {
      const initial = {};
      cartItems.forEach(item => {
        initial[item._id] = item.qty || 1;
      });
      setQuantities(initial);
    }
  }, [cartItems]);

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const setQty = (id, change) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + change); // Prevent going below 1
      return { ...prev, [id]: newQty };
    });
  };

  const getTotal = () => {
    return cartItems
      .filter(item => selectedIds.includes(item._id))
      .reduce((sum, item) => {
        const qty = quantities[item._id] || item.qty;
        return sum + item.price * qty;
      }, 0);
  };

  const handleCheckout = () => {
    const selectedItems = cartItems
      .filter(item => selectedIds.includes(item._id))
      .map(item => ({
        ...item,
        qty: quantities[item._id] || item.qty,
      }));

    navigate('/checkout', { state: { items: selectedItems } });
  };

  const removeItem = async (id) => {
    try {
      await axiosSecure.delete('https://ph-assignment-12-backend.vercel.app/cart', {
        params: {
          email: user.email,
          productId: id,
        },
      });
      // refetch cart data
      refetch();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };


  const clearCart = async () => {
    try {
      await axiosSecure.delete('https://ph-assignment-12-backend.vercel.app/cart', {
        params: {
          email: user.email,
        },
      });
      // refetch cart data
      refetch();
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };


  if (isLoading) return <p>Loading cart items...</p>;
  if (isError) return <p>Failed to load cart items.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Select</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Unit Price (৳)</th>
                  <th>Quantity</th>
                  <th>Total (৳)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item._id)}
                        onChange={() => handleSelect(item._id)}
                        className="checkbox checkbox-sm"
                      />
                    </td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.price}</td>
                    <td className="flex items-center gap-2">
                      <button
                        onClick={() => setQty(item._id, -1)}
                        className="btn btn-sm btn-outline btn-circle"
                      >
                        <FaMinus />
                      </button>
                      <span>{quantities[item._id] || item.qty}</span>
                      <button
                        onClick={() => setQty(item._id, 1)}
                        className="btn btn-sm btn-outline btn-circle"
                      >
                        <FaPlus />
                      </button>
                    </td>
                    <td>{item.price * (quantities[item._id] || item.qty)}</td>
                    <td>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-lg font-semibold">
                Total: ৳{getTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={clearCart} className="btn btn-outline btn-error">
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                disabled={selectedIds.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

