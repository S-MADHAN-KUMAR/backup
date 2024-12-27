import React, { useEffect, useState } from 'react'
import HomeProductCard from './HomeProductCard'
import axios from 'axios';

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } 
  };


  useEffect(() => {
   
    fetchProducts();
  }, []);

  return (
   <div className='bg-[#D7E5F0] w-[1366px]  flex flex-col justify-center pb-20'>
    <div className='md:w-2/3 w-[400px]  overflow-x-scroll overflow-y-hidden  flex flex-row justify-around items-center gap-x-10 ps-14 pe-8 p-6 md:p-10 noScroll'>
        <button className='btn2 '>
            Hoodies
        </button>
        <button className='btn2 shadow font-oswald uppercase '>
            Energy drinks
        </button>
        <button className='btn2 shadow font-oswald uppercase '>
            gym shoes
        </button>
    </div>
     <div className='w-[380px] h-[450px] md:h-fit md:w-[1366px] md:p-10 md:flex md:flex-wrap   gap-y-14 overflow-x-scroll overflow-y-hidden  flex flex-row  items-center gap-x-20 ps-14 pe-8 noScroll'>

     {products.map((product) => (
    <HomeProductCard
    key={product.id}
    product={product}
    />
  ))}
    </div>

   </div>
  )
}

export default HomeProducts
