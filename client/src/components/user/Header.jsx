import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currUser, setCurrUser] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchCurrUser = async () => {
    const id = currentUser?.user?._id;
    try {
      const res = await axios.get(`http://localhost:3000/user/getCurrentUser?id=${id}`);
      if (res.status === 200) {
        const fetchedUser = res.data.currentUser;
        if (fetchedUser.status === 'block') {
          dispatch(Logout());
          setCurrUser(null);
        } else {
          setCurrUser(fetchedUser);
        }
      }
    } catch (error) {
      console.error('Error fetching current user:', error.message);
    }
  };

  useEffect(() => {
    fetchCurrUser();
  }, [currentUser, dispatch]);

  const profilePicture =
    currUser?.profilePicture ||
    'https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg';

  const handleLogout = () => {
    dispatch(Logout());
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between w-full py-2 px-5 sticky top-0 ">
      {/* Logo */}
   <Link to={'/'}>
   <p className="text-4xl cursor-pointer  text-black font-audiowide uppercase">
        gym <span className="font-audiowide text-orange-500">RATS</span>
      </p>
   </Link>

      {/* Navigation Section */}
      <div className="flex items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex font-poppins text-black gap-x-8 uppercase tracking-widest font-semibold">
          <a href="/" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="/profile" className="hover:text-orange-500 transition-colors">About Us</a>
          <a href="/products" className="hover:text-orange-500 transition-colors">Products</a>
          <a href="/contact" className="hover:text-orange-500 transition-colors">Contact</a>
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
                    <a
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="hover:text-orange-500 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative hidden md:block ml-8">
          {currUser ? (
            <>
              <img
                onClick={() => navigate('/profile')}
                src={profilePicture}
                alt="Profile"
                className="relative w-10 h-10 rounded-sm object-contain cursor-pointer"
              />
              
            </>
          ) : (
            <h1
              onClick={() => navigate('/login')}
              className="font-poppins tracking-widest text-transparent font-bold text-3xl stroke-black cursor-pointer"
            >
              LOGIN
            </h1>
          )}
        </div>

      </div>
    </div>
  );
};

export default Header;
