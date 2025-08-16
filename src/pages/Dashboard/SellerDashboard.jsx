import React  from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';
import useAuth from '../../Context/useAuth';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const COLORS = ['#22c55e', '#f97316']; // success and warning

const SellerDashboard = () => {
  const { user } = useAuth(); // assumes user?.email is available

  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-sales-summary'],
    queryFn: async () => {
      const res = await axiosSecure.get(`https://ph-assignment-12-backend.vercel.app/seller/sales-summary?sellerEmail=${user.email}`);
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error loading data.</div>;

  const pieData = [
    { name: 'Paid', value: data.totalPaid },
    { name: 'Pending', value: data.totalPending }
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      {/* Summary Cards */}
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-content/10">
          <h3 className="text-lg font-semibold text-primary">Total Revenue</h3>
          <p className="text-3xl font-extrabold mt-2">৳{data.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-content/10">
          <h3 className="text-lg font-semibold text-secondary">Paid Total</h3>
          <p className="text-3xl font-extrabold mt-2">৳{data.totalPaid.toFixed(2)}</p>
        </div>
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-content/10">
          <h3 className="text-lg font-semibold text-warning">Pending Total</h3>
          <p className="text-3xl font-extrabold mt-2">৳{data.totalPending.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      {/* <div className="bg-white shadow p-4 rounded max-w-md mx-auto">
        <h3 className="text-lg font-bold mb-2">Payment Distribution</h3>
        <PieChart width={350} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {pieData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div> */}

      <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-content/10">
          <h3 className="text-xl font-bold mb-4 text-center">Payment Distribution</h3>
          <div className="flex justify-center">
            <PieChart width={350} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>      


    </div>
  );
};

export default SellerDashboard;
