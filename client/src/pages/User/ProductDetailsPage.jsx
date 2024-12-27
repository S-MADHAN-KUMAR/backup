import React, { useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import Breadcrumb from '../../components/user/Breadcrumb'
import { FaCartPlus } from "react-icons/fa"
import { CgCrown } from "react-icons/cg";
import { VscDebugRestart } from "react-icons/vsc";
import { IoCardOutline } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import { MdStar } from 'react-icons/md';
import ReviewCard from '../../components/user/ReviewCard';
import Footer from '../../components/user/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../User/NotFound.jsx';
import RelatedProducts from '../../components/user/RelatedProducts.jsx'
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { FiHeart } from "react-icons/fi";

const ProductDetailsPage = () => {


  const [isHovered, setIsHovered] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: '0% 0%' });
  const imgRef = useRef(null);
  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomStyle({ backgroundPosition: '0% 0%' });
  };
  
  const handleMouseMove = (event) => {
    if (imgRef.current && isHovered) {
      const { left, top, width, height } = imgRef.current.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;
  
      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;
  
      setZoomStyle({
        backgroundPosition: `${xPercent}% ${yPercent}%`,
      });
    }
  };
  

  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(''); 
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  const [relatedProducts, setRelatedProducts] = useState([]);


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/productsDetails/${id}`);
      const productData = response.data;
  
      if (productData && productData.status === 'listed') {
        setProduct(productData);
        setMainImage(productData.imageUrls?.[0] || '');
        setImages(productData.imageUrls || []);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/getRelatedProducts/${id}`);
      if (res.status === 200) {
        const filteredProducts = res.data.relatedProducts.filter((product) => product.status === 'listed');
        setRelatedProducts(filteredProducts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    if (id) {
      setLoading(true); 
      fetchProduct();
      fetchRelatedProducts();
    }
    window.scrollTo(0, 0);
  }, [id]);
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  
  const handleImageClick = (image) => {
    setMainImage(image);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!product) {
    return <div><NotFound /></div>;
  }
  

  return (
    <div className='overflow-hidden'>
      <div className=" sticky top-0 p-2 flex justify-between items-center bg-white z-20 shadow ">

  {/* Logo Section */}
  <p className="text-3xl cursor-pointer items-center font-semibold text-black font-audiowide uppercase hidden sm:block">
    gym <span className="font-audiowide text-transparent stroke-orange">RATS</span>
  </p>


 {/* search */}

 <div className='flex items-center w-full sm:w-6/12 border rounded-md sm:ms-20 overflow-hidden '>
        <input type="text" 
        placeholder='Search for items...'
        className='focus:outline-none px-6 py-2 w-full' />
        <div >
        <IoIosSearch className='w-10 h-10 text-gray-500 p-1'/>
        </div>
        </div>


    {/* Profile Section */}
    <div className='hidden sm:block'>
      <h1 className="font-oswald tracking-widest text-transparent font-bold text-3xl stroke-black">
        PROFILE
      </h1>
    </div>
    
</div>
 

    {/* Breadcrumb */}

    <div className="w-full border-black bg-gray-100">
        <Breadcrumb  />
      </div>




      <div >
        
        <div className='flex md:flex-row flex-col justify-between p-1 sm:p-5 md:h-[85vh] w-full'>
          {/* image-sec */}
          <div
      className="md:w-7/12 p-5 overflow-hidden cursor-crosshair relative h-full shadow-sm "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
     
      <img
        src={mainImage}
        alt="Zoomable"
        ref={imgRef}
        className="w-full h-full object-contain"
        style={{
          transition: 'transform 0.3s ease', 
          transform: isHovered ? 'scale(1.5)' : 'scale(1)', 
          transformOrigin: 'center center', 
        }}
      />
  
      {isHovered && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${mainImage})`,
            backgroundSize: '200%', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: zoomStyle.backgroundPosition,
            pointerEvents: 'none', 
          }}
        />
      )}
    </div>
        
<div className="flex flex-col md:flex-row w-full justify-between h-full  ">


        {/* description-sec */}
        <div className='md:w-9/12 font-Roboto flex p-1 flex-col h-full md:p-3 justify-between'>
        
        
        {/* title */}
        <h1 className='text-lg md:text-3xl leading-snug font-medium mb-2 md:mb-0'>{product.name}</h1>
        
      {/* Rating-reviews */}
        <div className="flex justify-between md:gap-x-5  mb-1 md:mb-0">

        <div className="flex items-center ">
        {
  Array(5).fill(null).map((_, index) => (
    <MdStar key={index} className='md:w-5 md:h-5 text-yellow-400' />
  ))
}
<p className='text-yellow-400 font-Roboto ms-2 font-medium text-sm md:text-base'>9.6</p>
        </div>

<div className="flex items-center text-[#a5a8ad]  text-sm md:text-base">
  <p>reviews</p>
  <BiSolidMessageDetail className='md:w-6  md:h-6 ms-2'/>
</div>
        </div>

        {/* Stock */}
        <p className={product.stock > 0 ? "text-green-500 font-medium text-sm md:text-base mb-4" :"text-red-500 font-medium text-sm md:text-base mb-4" } >{product.stock > 0 ?(
          <div className='flex items-center gap-x-2'>
          < SiTicktick className='md:w-5 md:h-5'/> <p>In stock</p>
          </div>
         ) : (
          <div className='flex items-center gap-x-4'>
          <IoClose className='w-5 h-5'/> <p>out of stock</p>
          </div>
         )}</p>
        
       
        {/* mini-images-sec */}
        <div className=' flex gap-x-4 mb-5 md:mb-0'>
        {images.map((image, index) => (
    <div key={index} className="md:w-20 w-12 md:h-20 hover:border-black hover:border cursor-pointer">
      <img src={image} alt={`image-${index}`} className={`w-full h-full object-cover ${mainImage === image ? 'border-black border-2 ' : ''}`} onClick={() => handleImageClick(image)}/>
    </div>
  ))}
        
        </div>

       {/* Description */}
       <div className="hidden md:block">
        <p className='font-medium text-sm mb-2'>About this item</p>
        <p className='text-xs leading-relaxed'>{product.description}</p>
       </div>
        
        

                </div>

<div className="flex flex-col justify-between md:mx-auto w-full md:w-3/12 p-2 rounded-md bg-sky-50">

<p className='text-3xl md:text-5xl text-green-500 font-semibold font-Roboto md:mb-2 mb-1  '>₹ {product.price}</p>
<p className='text-gray-400 font-Roboto line-through font-medium'>₹ {product.price + 700}</p>

<small className='text-gray-400 font-Roboto mt-4'>Brand</small>
<p className='text-red-400 font-Roboto md:mb-0 mb-6'>{product.brand}</p>

{/* Buttons */}
<div className="flex flex-col mb-4 gap-y-4 ">
<button className='btn'>Add to cart</button>
<button className='btn'>Buy now</button>
</div>

{/* Add Wishlist */}
<div className="md:mb-4 mb-6  flex items-center gap-x-2 text-blue-600 md:mx-auto ">
  <FiHeart className='w-5 h-5'/>
  <p className='font-semibold '>Add to wishlist</p>
</div>

 {/* Description */}
 <div className=" md:hidden mb-4 md:mb-0">
        <p className='font-medium text-sm mb-2'>About this item</p>
        <p className='text-xs leading-relaxed '>{product.description}</p>
       </div>

<hr />
        {/* terms  */}
        <div className='mt-4  font-Roboto text-xs
         text-gray-500 leading-relaxed'>
          <h1 className='flex
           items-start'><CgCrown className='w-4 h-4 me-2'/> 1 Year AL Jazeera Brand Warranty</h1>
         <h1 className='flex items-start'><VscDebugRestart className='w-4 h-4 me-2'/>Return, If any damages</h1>
         <h1 className='flex items-start'><IoCardOutline className='w-4 h-4 me-2'/> Cash on Delivery available</h1>
        </div>



</div>


</div>


        </div>
        
        <div className='md:p-12 p-2 bg-[#ebf2f771] flex justify-between'>
          
        <div >
        
        <RelatedProducts products={relatedProducts} />


        <div className='mb-20'>
        <h1 className='text-2xl font-medium font-oswald mb-2'>Purchase and review our product</h1>
        <div className="text-yellow-400 mb-8 flex gap-x-1 ">
                    <MdStar className=" w-7 h-7" />
                    <MdStar className=" w-7 h-7" />
                    <MdStar className=" w-7 h-7" />
                    <MdStar className=" w-7 h-7" />
                    <MdStar className=" w-7 h-7" />
                  </div>

        </div>
        
        <h1 className='text-3xl font-semibold font-oswald mb-6'>REVIEWS</h1>
        <ReviewCard/>
        <ReviewCard/>






        </div>


  
        
        
        {/* aside  */}
        
        <div className='w-3/12  bg-[#ffffff81] sm:flex flex-col-reverse items-center py-5 px-1 gap-8 hidden'>
        
        {/* category */}
        <div className='rounded-[20px] bg-white w-11/12 h-[250px] mt-3 shadow'>
          <h1 className='font-oswald tracking-wider font-medium border-b text-xl p-4'>Categories</h1>
          <div className='tracking-wider font-oswald text-lg  p-4 flex flex-col gap-y-3 text-gray-600 '>
          <p >shoes</p>
          <p>Proteins</p>
          <p>cloths</p>
          <p>others</p>
          </div>
        </div>
        
        {/* sort */}
        <div className='rounded-[20px] bg-white w-11/12 h-[300px] mt-3 shadow flex flex-col'>
          <h1 className='font-oswald tracking-wider border-b font-medium text-xl p-4'>Sort</h1>
          <div className='tracking-wider  font-oswald text-lg  p-4 flex flex-col gap-y-3 text-gray-600 '>
        <p>Price: Low to High</p>
        <p>Price: High to Low</p>
        <p>A - Z</p>
        <p>Z - A</p>
          </div>
          <button className='bg-blue-900 m-2 px-10  py-2 rounded-full shadow font-oswald tracking-widest f text-white '>Filter</button>
        </div>
        
        {/* new arriavals */}
        
        <div className='rounded-[20px] bg-white w-11/12 h-fit mt-3 shadow'>
          <h1 className='font-oswald tracking-wider font-medium border-b text-xl p-4'>New Arrivals</h1>
        
        <div className='mb-5'>
          <div className='flex shadow m-2 rounded-sm border overflow-hidden '>
            <img src="https://i.pinimg.com/236x/a1/40/97/a14097a2c471a16c47650096fef9f748.jpg" className="w-4/12" />
            <div className='w-8/12 p-2'>
            <div className="flex items-center justify-between">
                  <h1 className="font-oswald">Snickers Off-White 2024</h1>
                </div>
        
                {/* Product Price */}
                <div className="flex gap-x-4 text-sm font-oswald mt-1">
                  <p className="text-black font-medium">₹ 300</p>
                  <p className="line-through text-gray-500">₹ 1500</p>
                </div>
        
                {/* Product Rating */}
                <div className="gap-x-8 mt-1 flex flex-row  items-center">
        
                 <div className="text-yellow-300 flex gap-x-1 ">
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                  </div>
                  
                <p className=" mt-1 font-oswald text-sm text-gray-500">90 %</p>
                 </div>
        
            </div>
        
          </div>
        
          <div className='flex shadow m-2 rounded-sm border overflow-hidden '>
            <img src="https://i.pinimg.com/236x/a1/40/97/a14097a2c471a16c47650096fef9f748.jpg" className="w-4/12" />
            <div className='w-8/12 p-2'>
            <div className="flex items-center justify-between">
                  <h1 className="font-oswald">Snickers Off-White 2024</h1>
                </div>
        
                {/* Product Price */}
                <div className="flex gap-x-4 text-sm font-oswald mt-1">
                  <p className="text-black font-medium">₹ 300</p>
                  <p className="line-through text-gray-500">₹ 1500</p>
                </div>
        
                {/* Product Rating */}
                <div className="gap-x-8 mt-1 flex flex-row  items-center">
        
                 <div className="text-yellow-300 flex gap-x-1 ">
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                  </div>
                  
                <p className=" mt-1 font-oswald text-sm text-gray-500">90 %</p>
                 </div>
        
            </div>
        
          </div>
        
          <div className='flex shadow m-2 rounded-sm border overflow-hidden '>
            <img src="https://i.pinimg.com/236x/a1/40/97/a14097a2c471a16c47650096fef9f748.jpg" className="w-4/12" />
            <div className='w-8/12 p-2'>
            <div className="flex items-center justify-between">
                  <h1 className="font-oswald">Snickers Off-White 2024</h1>
                </div>
        
                {/* Product Price */}
                <div className="flex gap-x-4 text-sm font-oswald mt-1">
                  <p className="text-black font-medium">₹ 300</p>
                  <p className="line-through text-gray-500">₹ 1500</p>
                </div>
        
                {/* Product Rating */}
                <div className="gap-x-8 mt-1 flex flex-row  items-center">
        
                 <div className="text-yellow-300 flex gap-x-1 ">
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                    <MdStar className=" w-3" />
                  </div>
                  
                <p className=" mt-1 font-oswald text-sm text-gray-500">90 %</p>
                 </div>
        
            </div>
        
          </div>
        </div>
        
          </div>
        
          {/* posters */}
        
          <div className='relative rounded-[20px] bg-white w-11/12 h-[450px] mt-3 shadow'>
          <img src='https://i.pinimg.com/236x/e7/ee/f2/e7eef2c53a60559f0803e226e9cec174.jpg' className='rounded-[20px] shadow w-full h-full object-cover '/>
        
          <h1 className='text-white font-oswald text-4xl tracking-wide absolute top-8 left-6  font-bold'>Save 17% on
          Special</h1>
          <button className='absolute bottom-4 left-4 bg-black text-white font-oswald tracking-wider text-lg px-7 py-1 rounded-full'>Shop Now</button>
          </div>
        
          
        
         </div>
        
        </div>
        
              </div>

      <Footer/>
    </div>
  )
}

export default ProductDetailsPage


