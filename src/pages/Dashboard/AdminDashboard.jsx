import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = ['#3b82f6', '#facc15']; // DaisyUI primary & yellow colors

const AdminDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sales-summary'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/admin/sales-summary');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10">Error loading summary.</div>;

  const pieData = [
    { name: 'Paid', value: data.totalPaid },
    { name: 'Pending', value: data.totalPending }
  ];

  const barData = [
    { name: 'Total', amount: data.totalRevenue },
    { name: 'Paid', amount: data.totalPaid },
    { name: 'Pending', amount: data.totalPending }
  ];

  return (
    <div className="p-6 space-y-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Admin Dashboard</h2>

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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
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

        {/* Bar Chart */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md border border-base-content/10">
          <h3 className="text-xl font-bold mb-4 text-center">Revenue Breakdown</h3>
          <div className="overflow-x-auto">
            <BarChart
              width={Math.min(window.innerWidth * 0.8, 500)}
              height={300}
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#22c55e" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

