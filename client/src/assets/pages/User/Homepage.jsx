import React from 'react';
import Header from '../../components/user/Header';
import HomeBanner from '../../components/user/HomeBanner';
import RunningTexts from '../../components/user/RunningTexts';
import Carousel from '../../components/user/Carousel'
import Advertisement from '../../components/user/Advertisement';
import HomeProducts from '../../components/user/HomeProducts';
import Footer from '../../components/user/Footer';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {

const navigate = useNavigate()

  const gradients = [
    'from-pink-300 to-orange-300',
    'from-blue-300 to-green-300',
    'from-purple-300 to-pink-300',
    'from-yellow-300 to-red-300',
    'from-teal-300 to-cyan-300',
    'from-indigo-300 to-purple-300',
  ];

  // Select a random gradient on refresh
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
return (
    <div div className='overflow-hidden  '>
    <div  className={`overflow-hidden relative default-size bg-gradient-to-r ${randomGradient}`}>
      <Header />
      {/* <HomeBanner /> */}


     <HomeBanner/>

      <h1 className="uppercase font-oswald font-extrabold tracking-widest text-center text-6xl sm:text-9xl stroke-white text-transparent absolute top-64 w-full sm:block  hidden">
        FITNESS CLUB
      </h1>


<RunningTexts setting={{quotes:'no pain no gain' , css:"font-audiowide text-white/40 text-4xl",runSide:'left'
  , position:'absolute top-36'
}}/>

<RunningTexts setting={{quotes:'no guts no glory' , css:"font-audiowide text-transparent text-4xl stroke-black",runSide:'right', position:'absolute bottom-32 '}}/>


<div className='absolute bottom-5 left-6 shadow-lg shadow-gray flex font-semibold border-white border-4 rounded-full w-80 font-oswald tracking-widest text-base hidden md:flex'>
      {/* LOGIN Button */}

      <button
      onClick={()=>navigate('/login')}
        className='w-1/2 h-full rounded-full p-2 bg-white text-black '>
        LOGIN
      </button>
    
      
      {/* SIGN UP Button */}

    <button
    onClick={()=>navigate('/signup')}
        className='w-40 h-full rounded-full p-2 text- '>
        SIGN UP
      </button>

    </div>

<div className='absolute bottom-5 right-6 flex font-semibold border-white border-4 rounded-full w-80 font-oswald tracking-widest text-base hidden md:flex'>
      {/* LOGIN Button */}
      <button
        className='w-1/2 h-full rounded-full p-2 bg-white text-black '>
        WISHLIST
      </button>
      
      {/* SIGN UP Button */}
      <button
        className='w-40 h-full rounded-full p-2 text- '>
CART      </button>
    </div>


    
    </div>
    
{/* carousel */}

<Carousel/>

{/* Advertisement */}

<Advertisement />



<HomeProducts/>

<Footer/>


    </div>
  );
};

export default Homepage;
