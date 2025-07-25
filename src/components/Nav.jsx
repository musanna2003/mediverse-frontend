import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ corrected import path
import useAuth from '../Context/useAuth';
import { FaShoppingCart } from 'react-icons/fa';

const Nav = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/shop">Shop</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-primary/80 backdrop-blur-md text-white shadow-md sticky top-0 z-[1000]">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl normal-case">MediVerse</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">

        {/* ✅ Cart Button */}
        <NavLink to="/cart" className="btn btn-ghost relative">
          <FaShoppingCart className="text-xl" />
          {/* You can show item count here if needed:
          <span className="badge badge-sm badge-secondary absolute -top-1 -right-1">3</span>
          */}
        </NavLink>

        {/* Mobile Nav */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52 text-black">
            {navLinks}
          </ul>
        </div>

        {/* Auth Actions */}
        {!user ? (
          <NavLink to="/login" className="btn btn-ghost hover:bg-black/10">
            Join Us
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end relative z-[999]">
            <div tabIndex={0} className="btn btn-ghost p-0">
              <img
                src={user.photoURL || "https://i.ibb.co.com/NdFHxWHB/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <ul
              tabIndex={0}
              className="bg-base-100 rounded-box w-52 shadow-sm menu dropdown-content mt-3 p-2 z-[999]"
            >
              <li><span className="font-semibold">{user.displayName || "User"}</span></li>
              <li><Link to={'/profile'}>Profile</Link></li>
              <li><Link to={'/vendor-registration'}>Join as a Vendor</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
