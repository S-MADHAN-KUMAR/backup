import React, { useEffect, useState } from 'react';
import Header from '../../components/user/Header';
import HomeBanner from '../../components/user/HomeBanner';
import RunningTexts from '../../components/user/RunningTexts';
import Carousel from '../../components/user/Carousel';
import Advertisement from '../../components/user/Advertisement';
import HomeProducts from '../../components/user/HomeProducts';
import Footer from '../../components/user/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Logout } from '../../redux/user/userSlice';

const Homepage = () => {

  const { currentUser } = useSelector((state) => state.user);

  const [currUser, setCurrUser] = useState(currentUser)
const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = ()=>{
dispatch(Logout())
navigate('/login')
  }

  const fetchCurrUser = async () => {
    if (currentUser?.user?._id) {
      const id = currentUser?.user?._id; 
      try {
        const res = await axios.get(`http://localhost:3000/user/getCurrentUser?id=${id}`);
        if (res.status === 200) {
          const fetchedUser = res.data.currentUser;
          setCurrUser(fetchedUser); 
        }
      } catch (error) {
        console.error('Error in fetchCurrUser:', error.message);
      }
    }
  };

  useEffect(() => {
    if (!currUser) {
      fetchCurrUser();
    }
  }, [currUser]); 


  const gradients = [
    'from-pink-300 to-orange-300',
    'from-blue-300 to-green-300',
    'from-purple-300 to-pink-300',
    'from-yellow-300 to-red-300',
    'from-teal-300 to-cyan-300',
    'from-indigo-300 to-purple-300',
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className='overflow-hidden'>
      <div className={`overflow-hidden relative default-size bg-gradient-to-r ${randomGradient}`}>
        <Header />
        <HomeBanner />

        <h1 className="uppercase font-Roboto font-extrabold tracking-widest text-center text-6xl sm:text-9xl stroke-white text-transparent absolute top-64 w-full sm:block hidden drop-shadow-lg">
          FITNESS CLUB
        </h1>

        <RunningTexts setting={{
          quotes: 'no pain no gain', 
          css: "font-audiowide text-white/40 text-4xl", 
          runSide: 'left', 
          position: 'absolute top-36'
        }} />

        <RunningTexts setting={{
          quotes: 'no guts no glory', 
          css: "font-audiowide text-transparent text-7xl stroke-black", 
          runSide: 'right', 
          position: 'absolute bottom-32'
        }} />

        {currUser || currUser?.status === 'active' ? (
          <button 
          onClick={handleLogout}
          className=' absolute bottom-5 left-6 border-4 rounded-full bg-black text-white font-semibold text-lg px-8 py-1 '>LOGOUT</button>
        ) : (
          <div className='absolute bottom-5 left-6 shadow-lg shadow-gray flex font-semibold border-white border-4 rounded-full w-80 font-Roboto tracking-widest text-base hidden md:flex'>
            <button
              onClick={() => navigate('/login')}
              className='w-1/2 h-full rounded-full p-2 bg-white text-black'>
              LOGIN
            </button>
            <button
              onClick={() => navigate('/register')}
              className='w-40 h-full rounded-full p-2 text-black'>
              SIGN UP
            </button>
          </div>
        )}

        <div className='absolute bottom-5 right-6 flex font-semibold border-white border-4 rounded-full w-80 font-Roboto tracking-widest text-base hidden md:flex'>
          <button className='w-1/2 h-full rounded-full p-2 bg-white text-black'>
            WISHLIST
          </button>
          <button onClick={()=>navigate('/cart')} className='w-40 h-full rounded-full p-2 text-black'>
            CART
          </button>
        </div>
      </div>

      {/* carousel */}
      <Carousel />

      {/* Advertisement */}
      <Advertisement />

      <HomeProducts />

      <Footer />
    </div>
  );
};

export default Homepage;
