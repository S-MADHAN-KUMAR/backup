import React from "react";

const ProductCard = () => {
  return (
    <div className="relative  min-w-[300px]  md:w-80 h-fit p-10  bg-white rounded-lg shadow-lg hover:scale-105 duration-500">
      <span className="absolute flex items-center justify-center text-white text-sm font-bold uppercase top-2 left-0 w-20 h-20 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2">
        $120
      </span>
      <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/26438/shoe.png"
        alt="Nike Roshe Run Print"
        className="w-full -mt-5 mb-8"
      />
      <h1 className="text-2xl font-semibold text-black font-oswald mb-2">
        Nike Roshe Run Print
      </h1>
      <div className="w-8 h-1 bg-red-500 mb-4"></div>
      <p className="text-gray-600 font-oswald tracking-wide mb-4">
        The Nike Roshe One Print Men's Shoe offers breathability, lightweight
        cushioning and bold style with an injected unit midsole and colorful
        mesh upper.
      </p>
      <a
        href="#"
        className="absolute right-10 bottom-0 transform translate-y-1/2 bg-red-600 text-white font-bold py-3 px-8 rounded shadow-lg hover:bg-red-700 transition duration-300"
      >
        Buy Now
      </a>
    </div>
  );
};

export default ProductCard;


