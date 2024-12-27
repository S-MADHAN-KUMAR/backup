import React, { useState } from 'react';
import { motion } from 'framer-motion';
import product1 from '../../assets/images/shoes1.png';
import product2 from '../../assets/images/shoes2.png';
import product3 from '../../assets/images/shoes3.png';

const ShoeCarousel = () => {
  const [imageSrc, setImageSrc] = useState(product1);

  const changeImgSrc = (src) => {
    setImageSrc(src);
  };

  return (
    <div className="absolute md:top-6 md:right-12 right-5 mt-8 z-20">
        <div className="relative md:w-[400px] md:h-[400px] w-[300px] h-[400px]">
      {/* Thumbnail Section */}
      <div className="thumb absolute top-1/2 md:left-0 -left-[70px] transform -translate-y-1/2 z-10">
        <ul>
          <li
            onMouseOver={() => changeImgSrc(product1)}
            className="list-none w-[100px] h-[100px] m-[10px] flex items-center justify-center bg-white/20 shadow-[0_15px_25px_rgba(0,0,0,0.05)] border border-white/25 border-t-white/50 border-l-white/50 rounded-[25px] backdrop-blur-[4px]"
          >
            <img src={product1} alt="Product 1" className="w-[80%] transition-all duration-500" />
          </li>
          <li
            onMouseOver={() => changeImgSrc(product2)}
            className="list-none w-[100px] h-[100px] m-[10px] flex items-center justify-center bg-white/20 shadow-[0_15px_25px_rgba(0,0,0,0.05)] border border-white/25 border-t-white/50 border-l-white/50 rounded-[25px] backdrop-blur-[4px]"
          >
            <img src={product2} alt="Product 2" className="w-[80%] transition-all duration-500" />
          </li>
          <li
            onMouseOver={() => changeImgSrc(product3)}
            className="list-none w-[100px] h-[100px] m-[10px] flex items-center justify-center bg-white/20 shadow-[0_15px_25px_rgba(0,0,0,0.05)] border border-white/25 border-t-white/50 border-l-white/50 rounded-[25px] backdrop-blur-[4px]"
          >
            <img src={product3} alt="Product 3" className="w-[80%] transition-all duration-500" />
          </li>
        </ul>
      </div>

      {/* Image Box Section */}
      <div className="imgBox absolute top-0 right-0 w-[320px] md:w-[350px] h-full bg-white/20 shadow-[0_15px_25px_rgba(0,0,0,0.05)] border border-white/25 border-t-white/50 border-l-white/50 rounded-[25px] backdrop-blur-[4px] p-[60px_20px_0_50px] flex flex-col items-center justify-between">
        <h2 className="text-white font-audiowide uppercase tracking-wider">Nike Air Zoom</h2>
        <motion.img
          src={imageSrc}
          alt="Shoes"
          className="shoes w-[80%] transition-all duration-250"
          whileHover={{ scale: 1.5, rotate: -15, translateX: 20 }}
        />
        <ul className=" mb-16 flex justify-center items-center">
          <span className="text-white font-oswald text-lg tracking-wider mr-1">Size</span>
          <li className="list-none w-[30px] h-[30px] bg-white text-[#1e6b7b] flex items-center justify-center m-[5px] rounded-[4px] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-250 hover:translate-y-[-10px]">
            7
          </li>
          <li className="list-none w-[30px] h-[30px] bg-white text-[#1e6b7b] flex items-center justify-center m-[5px] rounded-[4px] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-250 hover:translate-y-[-10px]">
            8
          </li>
          <li className="list-none w-[30px] h-[30px] bg-white text-[#1e6b7b] flex items-center justify-center m-[5px] rounded-[4px] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-250 hover:translate-y-[-10px]">
            9
          </li>
          <li className="list-none w-[30px] h-[30px] bg-white text-[#1e6b7b] flex items-center justify-center m-[5px] rounded-[4px] font-bold shadow-[0_2px_10px_rgba(0,0,0,0.1)] cursor-pointer transition-all duration-250 hover:translate-y-[-10px]">
            10
          </li>
        </ul>
        <a
          href="#"
          className="b absolute bottom-[-30px] bg-white inline-block text-lg text-decoration-none p-[15px_30px] rounded-md font-oswald uppercase  shadow-[0_15px_35px_rgba(0,0,0,0.1)] font-medium text-[#1e6b7b] transition-all duration-250 hover:tracking-widest"
        >
          Add To Cart
        </a>
      </div>
    </div>
    </div>
  );
};

export default ShoeCarousel;
