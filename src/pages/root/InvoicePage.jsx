import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useAuth from '../../Context/useAuth';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const InvoicePage = () => {
  const location = useLocation();
  const { cartItems, totalAmount, paymentId } = location.state || {};
  const {user} = useAuth();
  console.log(user.email)

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get('http://localhost:3000/users/profile', {
          params: { email: user.email },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch user info:', err);
        });
    }
  }, [user?.email]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow print:p-0 print:shadow-none print:border-none">
      {/* Logo & Title */}
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <img src="/logo.png" alt="Website Logo" className="h-12" />
        <h1 className="text-2xl font-bold">Invoice</h1>
      </div>

      {/* User Info */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Billed To:</h2>
        <p>Name: {userInfo?.name }</p>
        <p>Email: {userInfo?.email }</p>
        <p>Address: {userInfo?.address }</p>
      </div>

      {/* Payment Info */}
      <div className="mb-6">
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>

      {/* Product Table */}
      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border p-2 text-left">Medicine Name</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-center">{item.qty}</td>
              <td className="border p-2 text-right">৳{item.price.toFixed(2)}</td>
              <td className="border p-2 text-right">৳{(item.price * item.qty).toFixed(2)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td className="border p-2 text-right" colSpan="3">Grand Total</td>
            <td className="border p-2 text-right">৳{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Print Button */}
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="btn btn-primary"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
