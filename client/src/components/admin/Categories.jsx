import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { showBlockConfirmation } from '../../helper/Sweat';
import { toast } from 'react-toastify';
import { showToast } from '../../helper/toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/categories');
      console.log('API Response:', response.data);
      setCategories(response.data || []); 
    } catch (err) {
      console.error(err);
      setError('Failed to load categories.');
    } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    
    fetchCategories();
  }, []);

  const handleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === "listed" ? "unlisted" : "listed";
    const title = `Do you want to ${newStatus === "listed" ? 'Unblock' : 'Block'} the Category?`;

    showBlockConfirmation(title, newStatus, async () => {
      try {
        await axios.put('http://localhost:3000/admin/blockCategory', { id, status: newStatus });
        fetchCategories();
        showToast(`Category has been ${newStatus === "listed" ? 'activated' : 'blocked'}`,'light','success');
      } catch (error) {
        console.error('Error blocking Category:', error);
        toast.error('Failed to update Category status');
      }
    });
  };



  if (loading) return <p className="text-center text-gray-600">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4 font-Roboto ">
      <div className="flex w-full justify-between p-5 items-center
      ">
      <h2 className="text-2xl font-bold mb-6 text-center  ">Categories</h2>
      <div className="mb-4 text-center">
        <Link
          to="/admin/dashboard/addCategories"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Categories
        </Link>
      </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="border-b text-center border-gray-300 px-6 py-3 ">Image</th>
              <th className="border-b text-center border-gray-300 px-6 py-3 ">Name</th>
              <th className="border-b text-center border-gray-300 px-6 py-3 ">Status</th>
              <th className=" border-gray-300 px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-300 p-2 w-1/4 ">
                    <img
                      src={category.imageUrl || 'https://via.placeholder.com/150'}
                      alt={category.name}
                      className=" object-cover "
                    />
                  </td>
                  <td className="border-b text-center border-gray-300 px-6 py-4">{category.name}</td>
                  <td className='border-b p-2 h-full '>
                    <p
                     className= {category.status === 'listed' ? 'border border-gray-300 text-center bg-green-500 p-2 rounded-full text-white font-medium ' : 'border border-gray-300  text-center bg-red-500 p-2 rounded-full text-white font-medium '}
                    >{category.status === 'listed' ? 'Listed' : 'Unlisted'}</p>
                  </td>
                  <td className="border-b h-full border-gray-300 text-center ">
                    <Link
                      to={`/admin/dashboard/editCategories/${category._id}`}
                      className="  bg-blue-500 text-white px-4 py-2 rounded mr-6"
                      
                    >
                      Edit
                    </Link>
                    <button
                      onClick={()=>handleBlock(category._id,category.status)}
                      className={`px-4 py-2 text-white rounded-md transition-colors duration-200 ${
                        category.status === 'unlisted' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600' 
                      }`}
                    >
                      {category.status === 'listed' ? 'Block' : 'Unblock'}
                    </button>
                  
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
