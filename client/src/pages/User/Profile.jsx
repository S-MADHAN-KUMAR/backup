import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaBox,
  FaAddressCard,
  FaWallet,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import { MdPerson } from "react-icons/md";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [currUser, setCurrUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const profilePicture =
    currUser?.profilePicture ||
    'https://via.placeholder.com/150'; // Use a reliable placeholder

  const fetchCurrUser = async () => {
    const userId = currentUser?.user?._id;
    if (!userId) {
      console.log('No user ID found!');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/user/getCurrentUser?id=${userId}`);
      if (res.status === 200) {
        const fetchedUser = res.data.currentUser;
        if (fetchedUser.status === 'block') {
          console.log('User is blocked. Logging out...');
          navigate('/login');
          return;
        }
        setCurrUser(fetchedUser);
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  useEffect(() => {
    fetchCurrUser();
  }, [currentUser]);

  return (
    <div className="flex flex-col font-Roboto b">
      {/* Header */}
      <div className="flex items-center justify-between w-full py-2 px-5 sticky top-0 bg-white shadow">
        <Link to="/">
          <p className="text-4xl font-bold text-black font-poppins uppercase cursor-pointer">
            gym <span className="font-audiowide text-orange-500">RATS</span>
          </p>
        </Link>

        {/* Navigation Section */}
        <div className="flex items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex font-poppins text-black gap-x-8 uppercase tracking-widest font-semibold">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link to="/profile" className="hover:text-orange-500 transition-colors">
              About Us
            </Link>
            <Link to="/products" className="hover:text-orange-500 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              className="text-black text-2xl hover:text-orange-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            {menuOpen && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-md z-50">
                <ul className="flex flex-col items-center gap-y-4 py-4 font-poppins text-black uppercase tracking-widest font-semibold">
                  {['Home', 'About Us', 'Products', 'Contact'].map((item, index) => (
                    <li key={index}>
                      <Link
                        to={`/${item.toLowerCase().replace(' ', '-')}`}
                        className="hover:text-orange-500 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full h-full border-t ">
        {/* Sidebar */}
        <div className="w-[220px] fixed left-0 h-[90vh] py-8 uppercase flex flex-col justify-between items-center  ">
          <div className="bg-sky-300 rounded-lg p-5 flex flex-col gap-y-3 font-semibold shadow  w-fit">
            {[
              { to: '/profile/general', icon: <MdPerson className='w-6 h-6'/>, label: 'general' },
              { to: '/profile/orders', icon: <FaBox />, label: 'Orders' },
              { to: '/profile/address', icon: <FaAddressCard />, label: 'Address' },
              { to: '/profile/wallet', icon: <FaWallet />, label: 'Wallet' },
              { to: '/profile/settings', icon: <FaCog />, label: 'Settings' },
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-x-3 px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? 'bg-white text-blue-500 '
                      : 'hover:bg-white/20 '
                  }`
                }
              >
                {icon} {label}
              </NavLink>
            ))}
          </div>

          <button
            className="flex justify-evenly btn2 bg-black"
            onClick={() => console.log('Logging out...')}
          >
            <FaSignOutAlt className="w-5 h-5" /> Log-out
          </button>
        </div>

        {/* Profile Section */}
        <div className="w-[220px] fixed right-0 h-[91vh] bg-gray-50">
          <div className="flex flex-col py-4 text-center font-Roboto">
            <img
              src={profilePicture}
              className="w-24 h-24 rounded-full mx-auto mb-4"
              alt="Profile"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback on error
            />
            <h1 className="font-audiowide uppercase font-semibold tracking-widest">
              {currUser?.name || 'User'}
            </h1>
            <p className="text-xs mt-2 text-gray-400">{currUser?.email || 'No email'}</p>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="w-[908px] ml-[220px]  min-h-[91vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
