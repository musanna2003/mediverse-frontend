import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import useAuth from '../Context/useAuth';
import { FaHome } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import axiosSecure from '../Utilities/axiosSecure.js'; // path as needed

const Dashboard = () => {
  //TODO

  const { user } = useAuth(); // assumes user.email is available
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchUserProfile = async () => {
          if (!user?.email) return;

          setLoading(true);
          setError(null);

          try {
              const res = await axiosSecure.get('http://localhost:3000/users/profile', {
                  params: { email: user.email },
              });
              setUserProfile(res.data);
          } catch (err) {
              console.error(err);
              setError('Failed to fetch user profile');
          } finally {
              setLoading(false);
          }
      };

      fetchUserProfile();
  }, [user?.email]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userProfile) return <p>No profile data.</p>;

  return (
    <div className="drawer md:drawer-open min-h-screen">
      {/* Drawer toggle for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar (mobile only) */}
        <div className="w-full bg-base-200 p-4 flex items-center justify-between md:hidden">
          <h2 className="text-xl font-bold">Seller Dashboard</h2>
          <div className="flex justify-center items-center">
            <div className="tooltip tooltip-bottom" data-tip="Home">
              <Link to="/" className="btn btn-ghost text-xl flex items-center justify-start gap-2">
                <FaHome />
              </Link>
            </div>
            <label htmlFor="dashboard-drawer" className="btn btn-ghost">
              <FaBars className="text-xl" />
            </label>
          </div>
        </div>

        {/* Main content goes here */}
        <div className="p-6">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay md:hidden"></label>
        
        <div className="min-h-screen menu bg-base-200 w-64">
          <div className="tooltip tooltip-bottom hidden md:flex" data-tip="Home">
            <Link to="/" className="btn btn-ghost text-xl flex items-center justify-start gap-2">
              <FaHome />
            </Link>
          </div>
          {/* User Profile */}
          <div className="p-4 border-b border-base-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={user?.photoURL} alt="User Avatar" className="w-[100%] rounded object-cover" />
            </div>
            <h3 className="mt-3 font-semibold text-lg">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Navigation Links */}
          <ul className="p-4 text-base-content">
            <li><Link to={"/dashboard"}>Dashboard</Link></li>
            {/* User-specific links */}
            {userProfile?.role === 'user' && (
                <>
                    <li><Link to={"/dashboard/user-payments"}>Payment History (User)</Link></li>
                </>
            )}

            {/* Seller-specific links */}
            {userProfile?.role === 'seller' && (
                <>
                    <li><Link to={"/dashboard/manage-medicines"}>Manage Products</Link></li>
                    <li><Link to={"/dashboard/addproduct"}>Add Product</Link></li>
                    <li><Link to={"/dashboard/seller-payment"}>Payment History (Seller)</Link></li>
                    <li><Link to={"/dashboard/offer-req"}>Ask For Advertisement</Link></li>
                </>
            )}

            {/* Admin-specific links */}
            {userProfile?.role === 'admin' && (
                <>
                    <li><Link to={"/dashboard/manage-users"}>Manage Users</Link></li>
                    <li><Link to={"/dashboard/seller-list"}>Seller List</Link></li>
                    <li><Link to={"/dashboard/seller-req"}>Seller Request</Link></li>
                    <li><Link to={"/dashboard/payment-management"}>Payment Management</Link></li>
                    <li><Link to={"/dashboard/sales-report"}>Sales Report</Link></li>
                    <li><Link to={"/dashboard/category"}>Manage Category</Link></li>
                    <li><Link to={"/dashboard/offer-req-admin"}>Manage Banner Advertise</Link></li>
                </>
              )}
          </ul>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Dashboard;
