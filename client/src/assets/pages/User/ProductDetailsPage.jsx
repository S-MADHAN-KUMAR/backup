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

const ProductDetailsPage = () => {


  const [isHovered, setIsHovered] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: '0% 0%' });
  const imgRef = useRef(null);
  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomStyle({ backgroundPosition: '0% 0%' }); // Reset zoom position when leaving the image
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
  

  const { id } = useParams(); // Get the id from the URL params
  
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(''); // Start with an empty string for the main image
  const [images, setImages] = useState([]); // Start with an empty array for images
  const [loading, setLoading] = useState(true);
  


  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/productsDetails/${id}`);
      const productData = response.data;
      
      // Check if the product status is 'listed'
      if (productData && productData.status === 'listed') {
        setProduct(productData);
        setMainImage(productData.imageUrls?.[0] || ''); // Use productData instead of product
        setImages(productData.imageUrls || []); // Use productData instead of product
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    // Fetch the product when the component loads or the ID changes
    fetchProduct();
    
  
  }, [id]); // Dependency array ensures that the product is fetched whenever `id` changes
  


  // Optionally, scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // This effect runs only once when the component mounts

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle product not found
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Products-details", href: "/productdetail" },
  ];
  return (
    <div className='overflow-hidden'>
      <div className=" sticky top-0 p-2 flex justify-between items-center bg-white z-20 shadow ">
  {/* Logo Section */}
  <p className="text-3xl cursor-pointer items-center font-bold text-black font-orbitron uppercase hidden sm:block">
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
        <Breadcrumb items={breadcrumbItems} />
      </div>




      <div >
        
        <div className='flex sm:flex-row flex-col md:flex mx-auto justify-between sm:w-11/12  border-8 h-full  '>
          {/* image-sec */}
          <div
      className="w-full  border sm:w-5/12 p-5  overflow-hidden relative"
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
          transition: 'transform 0.3s ease', // Optional smooth transition
          transform: isHovered ? 'scale(1.5)' : 'scale(1)', // Zoom effect on hover
          transformOrigin: 'center center', // Keeps the zoom centered
        }}
      />
      {isHovered && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url(${mainImage})`,
            backgroundSize: '200%', // Zoom level
            backgroundRepeat: 'no-repeat',
            backgroundPosition: zoomStyle.backgroundPosition,
            pointerEvents: 'none', // Makes sure the zoom window doesn't block mouse events
          }}
        />
      )}
    </div>
        
        {/* description-sec */}
                <div className=' sm:w-7/12 flex flex-col sm:h-[450px] p-5'>
        
        
        {/* title */}
        <h1 className='sm:text-5xl text-3xl mb-auto leading-snug font-semibold font-oswald tracking-wider'>{product.name}</h1>
        
        
        {/* pricd */}
        <div className='flex flex-col my-8 items-end sm:items-center gap-y-4 font-oswald '>
                 <div className='flex w-full items-center justify-between '>
                 <p className='font-semibold text-3xl sm:text-5xl text-green-600 '>${product.price}</p>
                 <p className='line-through font-medium text-2xl text-black/30'>{product.price +2000}</p>
                 </div>
                 
                 {/* <div className=' flex justify-between w-full items-end'>
                 <p className='font-medium text-xl text-red-600'>{product.rating}% Off</p>
        
        <div className='flex text-sm  flex-col items-end ml-auto mr-2'>
          <p>Rating (1)</p>
        <div className="text-yellow-300 flex gap-x-1 w-fit">
        {[...Array(5)].map((_, index) => (
<MdStar
key={index}
className={`w-3 ${index < product.rating / 20 ? "text-yellow-300  w-7 h-8" : "text-gray-300  w-7 h-8"}`}
/>
))}
        </div>
        </div>
                 </div> */}
        
      <p>{product.stock > 1 ? "inStock" : "out of stock"}</p>
        
                </div>
        {/* 
        mini-images-sec */}
        <div className=' flex sm:mb-3 mb-6 gap-x-4'>
        {images.map((image, index) => (
    <div key={index} className="w-16 h-16 hover:border-black hover:border-2 cursor-pointer">
      <img src={image} alt={`image-${index}`} className="w-full h-full object-cover"  onClick={() => handleImageClick(image)}/>
    </div>
  ))}
        
        </div>

        <p className='text-left  '>{product.description === 1 && 'outofStock' }</p>
        
        {/* actions */}
        <div className='flex gap-x-4  my-6 sm:gap-x-10 sm:p-5'>
          <button className='border-black border-[3px] rounded-md w-[200px] h-[50px] font-oswald font-medium text-xl tracking-wide hover:bg-black hover:text-white hover:font-medium flex items-center justify-center gap-x-3 '><FaCartPlus className='w-5 h-5'/> Add to cart</button>
          <button className='hover:border-black hover:border-[3px] rounded-md w-[200px] h-[50px] font-oswald font-medium text-xl tracking-wide bg-black text-white hover:font-medium hover:bg-white hover:text-black flex  items-center justify-center gap-x-3 '><FaCreditCard  className='w-5 h-5'/>buy now</button>
        </div>

        <p className='text-sm text-gray-400'>{product.description}</p>
        
        
        {/* terms  */}
        <div className='mb-5 p-2 font-oswald tracking-wide
         text-gray-500'>
          <h1 className='flex
           items-center'><CgCrown className='w-6 h-6 me-2'/> 1 Year AL Jazeera Brand Warranty</h1>
         <h1 className='flex items-center'><VscDebugRestart className='w-6 h-6 me-2'/>Return, If any damages</h1>
         <h1 className='flex items-center'><IoCardOutline className='w-6 h-6 me-2'/> Cash on Delivery available</h1>
        </div>
                </div>
        </div>
        
        <div className='sm:p-12 p-6 bg-[#ebf2f771] flex justify-between'>
          
        <div >
        
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


