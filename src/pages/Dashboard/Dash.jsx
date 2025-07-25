import React from 'react';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import SellerDashboard from './SellerDashboard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Context/useAuth';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const Dash = () => {
  const { user, loading } = useAuth();

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`http://localhost:3000/users/profile`, {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || isLoading) return <div className="text-center">Loading...</div>;

  const role = currentUser?.role;

  return (
    <div>
      {role === 'admin' && <AdminDashboard />}
      {role === 'seller' && <SellerDashboard />}
      {role === 'user' && <UserDashboard />}
    </div>
  );
};

export default Dash;
