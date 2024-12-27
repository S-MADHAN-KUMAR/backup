import React, { useState } from 'react';
// import { MdStar } from "react-icons/md";
import { FaPlus, FaRegHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdStar } from 'react-icons/md';

const ProductPageCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  const images = Array.isArray(product.imageUrls) ? product.imageUrls : [];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const isHotProduct = (updatedAt) => {
    const currentDate = new Date()
    const productDate = new Date(updatedAt)
    const timeDifference = (currentDate - productDate) / (1000 * 3600 * 24)
    return timeDifference <= 1
  };

  return (
    <div className="z-10 relative rounded-[16px] shadow-md sm:w-[220px] w-[180px] h-[290px] sm:h-[300px] bg-[#86aabb11] p-2 flex flex-col items-center ">
     <Link  to={`/products/${product._id}`}>

<div className="md:w-[200px] md:h-[180px]">
        {/* Product Image */}
        <motion.img
          src={hovered && images.length > 1 ? getRandomImage() : images[0] || 'fallback-image.jpg'} // Default image if no images
          alt={product.title}
          className="w-full object-cover h-full cursor-pointer shadow rounded-[10px] bg-[#ffff]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        </div>
      </Link>

      {/* Product Details */}
      <div className="mt-2 h-full px-1 justify-between flex flex-col w-full ">
        {/* Product Title */}
        <div className="flex mb-1 items-center justify-between">
          <h1 className="font-Roboto text-sm sm:text-[17px]">{product.name.length > 10 ? `${product.name.slice(0, 15)}..` : product.name}</h1>
          <FaRegHeart className="w-5 h-5 cursor-pointer hover:scale-110" />
        </div>

        {/* Product Price */}
        <div className=" flex justify-between items-center font-Roboto ">
          <p className=" font-medium">₹ {product.price}</p>


        {/* Product Rating */}
     <div className="flex justify-between mb-1 "> 
          <div>
            <div className="text-yellow-300 flex">  
            {
              Array(5).fill(null).map((_, index) => (
                <MdStar key={index} className='w-3 h-3 text-yellow-400' />
                
              ))
}
<p className='text-yellow-400 font-Roboto ms-1 text-xs font-medium'>9.6</p>
            </div>
         
              </div>
          </div>
          </div>
        

        <div className="flex justify-between">
        <p className="line-through text-gray-500 text-xs">₹ {product.price + 2000}</p>
            {/* Add to Cart Button */}
            <button className="bg-black rounded-lg text-white font-Roboto text-xs px-2 py-2 sm:text-sm tracking-widest sm:px-3 sm:py-2 flex items-center sm:gap-x-2 hover:scale-105 float-right ">
            <FaPlus /> Add to cart
          </button>
        </div>
        

 {isHotProduct(product.updatedAt) && (
          <div className="cursor-pointer hover:scale-105 absolute -top-6 sm:-top-2 -right-3 bg-[#A3E81D] px-3 py-1 rounded-sm w-fit">
            <p className="font-Roboto font-semibold text-xs ">HOT</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPageCard;
