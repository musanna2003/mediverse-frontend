import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAuth from '../../Context/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchCartItems = async (email) => {
  const res = await axios.get('http://localhost:3000/cart', {
    params: { email },
  });
  return res.data;
};

const CartPage = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
 
  const { data: cartItems, isLoading, isError } = useQuery({
        queryKey: ['cartItems', user?.email],
        queryFn: () => fetchCartItems(user.email),
  });
  console.log(user.email)

  console.log(cartItems)
  


  const removeItem = (id) =>{
    console.log(id);
  }

  const clearCart = () =>{

  }

  const setQty = (a) =>{
    console.log(a);
  }


  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  if (isLoading) return <p>Loading sellers...</p>;
  if (isError) return <p>Failed to load sellers.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems?.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
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
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>{item.price}</td>
                    <td className="flex items-center gap-2">
                      <button onClick={() => setQty(-1)} className="btn btn-sm btn-outline btn-circle">
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => setQty(1)} className="btn btn-sm btn-outline btn-circle">
                        <FaPlus />
                      </button>
                    </td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => removeItem(item._id)} className="btn btn-sm btn-outline btn-error">
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
              <p className="text-lg font-semibold">Total: ৳{getTotal()}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={clearCart} className="btn btn-outline btn-error">Clear Cart</button>
              <button onClick={() => navigate('/checkout')} className="btn btn-primary">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
