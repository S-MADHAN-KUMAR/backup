import React from 'react'
import { Link } from 'react-router-dom';

const Orders = () => {
  const orders = [
    {
      id: '12345',
      paymentMethod: 'Credit Card',
      total: '$150.00',
      name: 'hoodie',
      size: "XL",
      status: 'Shipped',
      date: '2024-12-01',
    },
    {
      id: '12346',
      paymentMethod: 'PayPal',
      total: '$200.00',
      name: 'hoodie',
      size: "XL",
      status: 'Pending',
      date: '2024-12-05',
    },
    {
      id: '12347',
      paymentMethod: 'Debit Card',
      total: '$350.00',
      name: 'hoodie',
      size: "XL",
      status: 'Delivered',
      date: '2024-12-03',
    },
  ];
  
  return (
    <div className='border h-full p-5 flex flex-col gap-y-6 font-Roboto'>
      <h1 className='font-audiowide text-3xl uppercase drop-shadow'>Orders List</h1>

      <div className="border p-2 font-Roboto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="px-4 w-[260px] py-2 border">Order</th>
              <th className="px-4 py-2 border">Payment Method</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-7 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 border flex gap-x-3">
                  <img src="" className="w-20 h-20 border" alt="order item" />
                  <div className="flex flex-col">
                    <p className='text-sm font-medium'>Order Id: {order.id}</p>
                    <p className='font-medium'>{order.name}</p>
                    <p className='text-sm'>size: {order.size}</p>
                  </div>
                </td>
                <td className="px-4 py-2 border">{order.paymentMethod}</td>
                <td className="px-4 py-2 border">{order.total}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.date}</td>
                <td className="px-4 py-2 border">
                <Link to={`/profile/order_detail/${order.id}`}>
  <button className="bg-black p-2 rounded-md text-white text-sm font-medium w-full">View</button>
</Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
