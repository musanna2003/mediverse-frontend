import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../Context/useAuth';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const SellerPaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await axiosSecure.get('http://localhost:3000/order/seller-payments', {
        params: { sellerEmail: user.email },
      });
      setPayments(res.data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchPayments();
    }
  }, [user?.email]);

    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Payment History</h2>

        {loading ? (
            <p>Loading payment history...</p>
        ) : payments.length === 0 ? (
            <p>No payment records found.</p>
        ) : (
            <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
                <thead>
                <tr>
                    <th>Medicine</th>
                    <th>Buyer Email</th>
                    <th>Quantity</th>
                    <th>Total Price (৳)</th>
                    <th>Payment Status</th>
                    <th>Order Date</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((order) => (
                    <tr key={order._id}>
                    <td>{order.productName}</td>
                    <td>{order.userEmail}</td>
                    <td>{order.qty}</td>
                    <td>{order.subtotal.toFixed(2)}</td>
                    <td>
                        <span className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}>
                        {order.paymentStatus}
                        </span>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default SellerPaymentHistory;