import React from "react";

const Coupon = () => {
  const couponData = [
    {
      code: "SAVE10",
      discountPercentage: 10,
      expiryDate: "2024-12-31",
    },
    {
      code: "NEWYEAR20",
      discountPercentage: 20,
      expiryDate: "2024-01-01",
    },
  ];
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Coupon List</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
          + Add Coupon
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="bg-gray-200 font-semibold tracking-wider">
            <tr>
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount Percentage</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {couponData && couponData.length > 0 ? (
              couponData.map((coupon, index) => (
                <tr key={index} className="border-b bg-gray-50">
                  <td className="p-4">{coupon.code}</td>
                  <td className="p-4">{coupon.discountPercentage}%</td>
                  <td className="p-4">{coupon.expiryDate}</td>
                  <td className="p-4">
                    <button
                      className="px-3 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      title="Activate"
                    >
                      Activate
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 ml-2"
                      title="Deactivate"
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupon;
