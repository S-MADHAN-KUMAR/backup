import React, { useState } from 'react';
import { MdStar } from "react-icons/md";
import { FaPlus, FaRegHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const HomeProductCard = ({product}) => {
  const [hovered, setHovered] = useState(false);

  const images = Array.isArray(product.images) ? product.images : [];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div
      className="z-10 relative rounded-[17px] shadow-lg min-w-[261px] h-[359px] bg-white p-3 flex flex-col items-center  "
    >
      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
       <motion.img
       src={hovered && images.length > 1 ? getRandomImage() : images[0] || 'fallback-image.jpg'} 
        alt="Snickers Off-White"
        className="w-[235px] h-[228px] cursor-pointer object-cover shadow rounded-[10px] bg-gray-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeInOut" }} 
      />
      </Link>


      {/* Product Details */}
      <div className="mt-2 w-full">
        {/* Product Title */}
        <div className="flex items-center justify-between">
          <h1 className="font-oswald text-lg">{product.title}</h1>
          <FaRegHeart className="w-5 h-5 cursor-pointer hover:scale-110" />
        </div>

        {/* Product Price */}
        <div className="flex gap-x-4 font-oswald mt-1">
          <p className="text-black">₹ {product.price}</p>
          <p className="line-through text-gray-500">₹ {product.originalPrice}</p>
        </div>

        {/* Product Rating */}
        <div className="gap-x-1 mt-1 flex justify-between items-center">
         <div >
         <div className="text-yellow-300 flex gap-x-1 w-fit">
              {/* Display stars based on the rating */}
              {[...Array(5)].map((_, index) => (
                <MdStar
                  key={index}
                  className={`w-3 ${index < product.rating / 20 ? "text-yellow-300" : "text-gray-300"}`}
                />
              ))}
          </div>
          
        <p className=" mt-1 font-oswald text-[15px] text-gray-500">{product.rating} %</p>
         </div>


           {/* Add to Cart Button */}
        <button className=" bg-black rounded-lg text-white font-oswald tracking-widest px-3 py-2 font-light flex items-center gap-x-2 hover:scale-105">
          <FaPlus /> Add to cart
        </button>
        </div>

       

        <div className="cursor-pointer hover:scale-105 absolute -top-4 -right-4 bg-[#A3E81D] px-4 py-1 rounded-sm w-fit">
          <p className="font-oswald font-semibold">HOT</p>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard; 