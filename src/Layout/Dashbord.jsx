import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';

const Dashboard = () => {
  //TODO
  const user = {
    name: "Musanna",
    email: "musanna@example.com",
    photoURL: "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp", // sample avatar
  };

  return (
    <div className="drawer md:drawer-open min-h-screen">
      {/* Drawer toggle for mobile */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar (mobile only) */}
        <div className="w-full bg-base-200 p-4 flex items-center justify-between md:hidden">
          <h2 className="text-xl font-bold">Seller Dashboard</h2>
          <label htmlFor="dashboard-drawer" className="btn btn-ghost">
            <FaBars className="text-xl" />
          </label>
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
          {/* User Profile */}
          <div className="p-4 border-b border-base-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={user.photoURL} alt="User Avatar" className="w-[100%] rounded object-cover" />
            </div>
            <h3 className="mt-3 font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Navigation Links */}
          <ul className="p-4 text-base-content">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/dashboard"}>Dash Board</Link></li>
            <li><Link to={"/dashboard/manage-medicines"}>Manage Medicines</Link></li>
            <li><Link to={"/dashboard/addproduct"}>Add Product</Link></li>
            <li><a href="#">My Products</a></li>
            <li><a href="#">Orders</a></li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
