import React from "react";

const Orders = () => {
  const orderData = [
    {
      date: "November 28, 2024",
      id: "a1b2c3d4e5",
      payment: "Razorpay",
      method: "Credit Card",
      status: "Processing",
    },
    {
      date: "November 27, 2024",
      id: "f6g7h8i9j0",
      payment: "PayPal",
      method: "Debit Card",
      status: "Shipped",
    },
    {
      date: "November 26, 2024",
      id: "k1l2m3n4o5",
      payment: "Stripe",
      method: "Net Banking",
      status: "Delivered",
    },
    {
      date: "November 25, 2024",
      id: "p6q7r8s9t0",
      payment: "Google Pay",
      method: "UPI",
      status: "Cancelled",
    },
    {
      date: "November 24, 2024",
      id: "u1v2w3x4y5",
      payment: "Cash",
      method: "Cash on Delivery",
      status: "Processing",
    },
  ];
  
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Order List</h1>
        <div className="border rounded-md flex items-center">
          <input
            type="text"
            className="border-none px-4 py-2 outline-none w-full"
            placeholder="Search order ID"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="bg-gray-200 font-semibold tracking-wider">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">#ID</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Method</th>
              <th className="p-4">Status</th>
              <th className="p-4">Change Order Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {orderData && orderData.length > 0 ? (
              orderData.map((order, index) => (
                <tr key={index} className="border-b bg-gray-50">
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.payment}</td>
                  <td className="p-4">{order.method}</td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    <select className="border px-2 py-1 rounded-md text-sm">
                      <option value="">Change order status</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="px-4 py-1 bg-blue-500 text-white rounded-md text-sm">
                      Submit
                    </button>
                    <button className="px-4 py-1 bg-gray-500 text-white rounded-md text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
