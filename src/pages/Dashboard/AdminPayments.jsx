import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const AdminPayments = () => {
  const queryClient = useQueryClient();

  // Fetch all payments
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('http://localhost:3000/payments');
      return res.data;
    }
  });

  // Mutation to update payment status
  const mutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`http://localhost:3000/payments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['payments']);
    }
  });

  const handleAcceptPayment = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment Management</h2>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.userEmail}</td>
              <td>{p.productName || 'Multiple'}</td>
              <td>৳{p.subtotal || p.totalAmount}</td>
              <td>
                <span className={`badge ${p.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                  {p.paymentStatus}
                </span>
              </td>
              <td>
                {p.paymentStatus === 'pending' && (
                  <button onClick={() => handleAcceptPayment(p._id)} className="btn btn-sm btn-primary">
                    Accept Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
