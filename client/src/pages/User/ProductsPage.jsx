import React, { useEffect, useState } from 'react'
import ProductPageCard from '../../components/user/ProductPageCard'
import Footer from '../../components/user/Footer'
import { IoIosSearch } from "react-icons/io";
import Breadcrumb from '../../components/user/Breadcrumb'
import Pagination from '../../components/user/Pagination';
import Aside from '../../components/user/Aside';
import axios from 'axios';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  const [numItems, setNumItems] = useState(9); // Set the default number of items to display (9)

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/user/products');
      const listedProduct = response.data.filter((element) => element.status === 'listed');
      // Apply other filters based on user choice
      if (filter === 'LowToHigh') {
        setProducts(listedProduct.sort((a, b) => a.price - b.price));
      } else if (filter === 'HighToLow') {
        setProducts(listedProduct.sort((a, b) => b.price - a.price));
      } else if (filter === 'AZ') {
        setProducts(listedProduct.sort((a, b) => a.name.localeCompare(b.name)));
      } else if (filter === 'ZA') {
        setProducts(listedProduct.sort((a, b) => b.name.localeCompare(a.name)));
      } else if (filter === 'Popularity') {
        setProducts(listedProduct.sort((a, b) => b.popularity - a.popularity));
      } else if (filter) {
        setProducts(listedProduct.filter((product) => product.category === filter));
      } else {
        setProducts(listedProduct);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch products whenever `filter` or `numItems` changes
  useEffect(() => {
    fetchProducts();
  }, [filter, numItems]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  const handleSelectChange = (e) => {
    setNumItems(parseInt(e.target.value));
  };

  return (
    <div className='bg-[#D7E5F0] overflow-hidden'>
      <div className="sticky top-0 p-2 flex justify-between items-center bg-white z-20 shadow">
        <p className="text-3xl cursor-pointer items-center  text-black font-audiowide uppercase hidden">
          gym <span className="font-audiowide text-transparent stroke-orange">RATS</span>
        </p>

        {/* Search */}
        <div className='flex items-center w-full sm:w-6/12 border rounded-md me-6 sm:ms-20 overflow-hidden '>
          <input type="text" placeholder='Search for items...' className='focus:outline-none px-6 py-2 w-full' />
          <div >
            <IoIosSearch className='w-10 h-10 text-gray-500 p-1' />
          </div>
        </div>

        {/* Profile Section */}
        <div>
          <h1 className="font-Roboto tracking-widest text-transparent font-bold text-3xl stroke-black">
            PROFILE
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="w-full border-black bg-gray-100">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex">
        {/* Aside */}
        <div className='bg-[#ffffff81] sm:block hidden'>
          <Aside setFilter={setFilter} filter={filter} />
        </div>

        <div className='sm:w-[1106px] w-[100vw] pb-12 flex flex-col bg-[#ffffff]'>
          <div className='sm:px-8 px-4 pt-6 flex justify-between'>
            <h1 className='font-medium tracking-wider font-Roboto sm:text-xl'>
              We found <span className='text-blue-600'>{products.length > 0 ?  numItems : 'no'}</span> items for you!
            </h1>

            {/* Filter by Number of Products */}
            <select
              className="border rounded w-fit px-2 py-1 sm:p-2 font-medium tracking-widest font-Roboto text-gray-700 sm:px-7 focus:outline-none"
              value={numItems}
              onChange={handleSelectChange}
            >
              <option value="1">Shows 1</option>
              <option value="3">Shows 3</option>
              <option value="6">Shows 6</option>
              <option value="9">Shows 9</option>
            </select>
          </div>

          {/* Product List */}
          <div className='mt-12 grid sm:grid-cols-4 grid-flow-row place-content-center place-items-center gap-y-10 pb-16 grid-cols-2'>
            {products.length > 0 ? (
              products.slice(0, numItems).map((product) => (
                <ProductPageCard key={product._id} product={product} />
              ))
            ) : (
              <p className='text-2xl whitespace-nowrap ms-12 font-Roboto tracking-wider text-gray-300'>
                No products available...
              </p>
            )}
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductsPage;
