import React from 'react';

const Reviews = () => {
  const reviewData = [
    {
      image: 'https://via.placeholder.com/150',
      product: 'Headphones',
      name: 'John Doe',
      comment: 'Great product, highly recommend!',
      addedAt: '2024-11-28',
      status: 'Active',
    },
    {
      image: 'https://via.placeholder.com/150',
      product: 'Smartphone',
      name: 'Jane Smith',
      comment: 'The battery life is fantastic.',
      addedAt: '2024-11-27',
      status: 'Inactive',
    },
  ];
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Review List</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          + Add Review
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="bg-gray-200 font-semibold tracking-wider">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Name</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {reviewData && reviewData.length > 0 ? (
              reviewData.map((review, index) => (
                <tr key={index} className="border-b bg-gray-50">
                  <td className="p-4">
                    <img
                      src={review.image}
                      alt={review.product}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4">{review.product}</td>
                  <td className="p-4">{review.name}</td>
                  <td className="p-4">{review.comment}</td>
                  <td className="p-4">{review.addedAt}</td>
                  <td className="p-4">{review.status}</td>
                  <td className="p-4">
                    <button
                      className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      title="Block"
                    >
                      Block
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
