import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../Context/useAuth';

const UserPaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:3000/order/seller-payments', {
        params: { userEmail: user.email },
      });
      setPayments(res.data);
    } catch (error) {
      console.error('Error fetching user payment history:', error);
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
      <h2 className="text-2xl font-bold mb-6">My Payment History</h2>

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
                <th>Quantity</th>
                <th>Total Price (৳)</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((order) => (
                <tr key={order._id}>
                  <td>{order.productName}</td>
                  <td>{order.qty}</td>
                  <td>{order.subtotal.toFixed(2)}</td>
                  <td>{order.transactionId || 'N/A'}</td>
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

export default UserPaymentHistory;
