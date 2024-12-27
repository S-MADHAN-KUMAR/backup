import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banners = () => {
  const navigate = useNavigate()
  const bannerData = [
    {
      image: 'https://via.placeholder.com/150',
      name: 'Spring Sale',
      description: 'Up to 50% off on all items!',
      status: 'Active',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'New Year Bash',
      description: 'Celebrate with amazing discounts!',
      status: 'Inactive',
    },
  ];
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Banner List</h1>
        <button onClick={()=>navigate('/admin/dashboard/add_brands')} className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          + Add Banner
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="bg-gray-200 font-semibold tracking-wider">
            <tr>
              <th className="p-4">Banner Image</th>
              <th className="p-4">Banner Name</th>
              <th className="p-4">Banner Description</th>
              <th className="p-4">Banner Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bannerData && bannerData.length > 0 ? (
              bannerData.map((banner, index) => (
                <tr key={index} className="border-b bg-gray-50">
                  <td className="p-4">
                    <img
                      src={banner.image}
                      alt={banner.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4">{banner.name}</td>
                  <td className="p-4">{banner.description}</td>
                  <td className="p-4">{banner.status}</td>
                  <td className="p-4">
                    <button
                      className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      title="Block"
                    >
                      Block
                    </button>
                    <button
                      className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 ml-2"
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
                  No banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Banners;
