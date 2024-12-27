import React, { useEffect, useState } from 'react'
import ProductPageCard from '../../components/user/ProductPageCard'
import Footer from '../../components/user/Footer'
import { IoIosSearch } from "react-icons/io";
import Breadcrumb from '../../components/user/Breadcrumb'
import Pagination  from '../../components/user/Pagination';
import Aside from '../../components/user/Aside';
import axios from 'axios';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true); // Set loading state to true when fetching starts

    try {
      const response = await axios.get('http://localhost:3000/user/products')
      const products = response.data; // Access the data from the response

      // Filter the listed products if necessary
      const listedProduct = products.filter(element => element.status === 'listed');
      
      if (listedProduct.length > 0) {
        setProducts(listedProduct); // Set products to the array of listed products
      } else {
        console.error('No listed products found');
        setProducts([]); // Set to empty array if no listed products found
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Set products to empty array in case of error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(()=>{
    fetchProducts()
  },[])


  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  return (
    <div className='bg-[#D7E5F0]  overflow-hidden '>
      

      <div className=" sticky top-0 p-2 flex justify-between items-center bg-white z-20 shadow">
  {/* Logo Section */}
  <p className="text-3xl cursor-pointer items-center font-bold text-black font-orbitron uppercase hidden">
    gym <span className="font-audiowide text-transparent stroke-orange">RATS</span>
  </p>


 {/* search */}

 <div className='flex items-center w-full sm:w-6/12 border rounded-md me-6 sm:ms-20 overflow-hidden '>
        <input type="text" 
        placeholder='Search for items...'
        className='focus:outline-none px-6 py-2 w-full' />
        <div >
        <IoIosSearch className='w-10 h-10 text-gray-500 p-1'/>
        </div>
        </div>


    {/* Profile Section */}
    <div>
      <h1 className="font-oswald tracking-widest text-transparent font-bold text-3xl stroke-black">
        PROFILE
      </h1>
    </div>
    
</div>



      


        
       

      {/* Breadcrumb */}

      <div className="w-full border-black bg-gray-100">
        <Breadcrumb items={breadcrumbItems} />
      </div>


     
 <div className="flex">


{/* aside */}
<div className='bg-[#ffffff81] sm:block hidden'>
<Aside/>
</div>


 <div className='sm:w-[1106px] w-[100vw] pb-12 flex flex-col bg-[#ffffff]'>

<div className='sm:px-8 px-4 pt-6 flex justify-between'>
<h1 className='font-medium tracking-wider font-oswald sm:text-xl'>We found <span className='text-blue-600'>{products.length > 0 ? products.length : 'no'}</span> items for you !</h1>


<select className="border rounded w-fit px-2 py-1 sm:p-2 font-medium tracking-widest font-oswald text-gray-700 sm:px-7 focus:outline-none">
      <option >
        <span className="flex items-center">
         Shows
        </span>
      </option>
      <option >1</option>
      <option >3</option>
      <option >6</option>
      <option >9</option>
    </select>

</div>



 <div className='mt-12 grid sm:grid-cols-4 grid-flow-row  place-content-center place-items-center gap-y-10 pb-16 grid-cols-2  '>
 {
  products.length > 0 ? (
    products.map((product) => (
      <ProductPageCard
        key={product._id}
        product={product}
      />
    ))
  ) : (
    <p className='text-2xl whitespace-nowrap  ms-12  font-oswald tracking-wider text-gray-300'>No products available...</p> // Fallback message if no products are available
  )
}

</div> 

<Pagination />
 </div>

  </div>  
  <Footer/>
    </div>
  )
}

export default ProductsPage
