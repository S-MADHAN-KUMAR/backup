import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Brands = () => {
  const [brandsData, setBrandsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/getbrands');
        setBrandsData(response.data.brands);
      } catch (err) {
        setError('Failed to fetch brands data.');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Brand List</h1>
       <Link to={'/admin/dashboard/add_brands'}>
       <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          + Add Brand
        </button>
        </Link>
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center p-4 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center p-4 text-red-500">{error}</div>
      ) : (
        /* Table Section */
        <div className="overflow-x-auto border rounded-md">
          <table className="table-auto w-full text-center text-sm">
            {/* Table Head */}
            <thead className="bg-gray-200 font-semibold tracking-wider">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Statud</th>

                <th className="p-4">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {brandsData && brandsData.length > 0 ? (
                brandsData.map((brand, index) => (
                  <tr key={index} className="border-b bg-gray-50">
                    <td className="p-4">
                      <img
                        src={brand.imageUrl}
                        alt={brand.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-4">{brand.name}</td>
                    <td className='border-b p-2 h-full '>
                    <p
                     className= {brand.status === 'listed' ? 'border border-gray-300 text-center bg-green-500 p-2 rounded-full text-white font-medium ' : 'border border-gray-300  text-center bg-red-500 p-2 rounded-full text-white font-medium '}
                    >{brand.status === 'listed' ? 'Listed' : 'Unlisted'}</p>
                  </td>

                    <td className="p-4 flex justify-center space-x-2">
                      <button
                        className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                        title="Block"
                      >
                        Block
                      </button>
                      <button
                        className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                        title="Edit"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No brands found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Brands;
