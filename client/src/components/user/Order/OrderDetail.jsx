import React from 'react'
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams(); // Extract the order ID from the URL parameter
  
  return (
    <div>
      <h2>Order Detail</h2>
      <p>Order ID: {id}</p>
      {/* You can fetch and display additional details based on the order ID */}
    </div>
  );
}

export default OrderDetail;
