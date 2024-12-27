import React from 'react'
import Header from '../../components/user/Header'

const Cart = () => {
  return (
    <div>
<Header/>
<div className="border p-6 font-Roboto">
<h1 className='font-audiowide uppercase mb-2 text-3xl drop-shadow'>Shopping Cart</h1>
<p>1 Items in your cart</p> 
{/* Cart items */}
<div className="border mt-8 flex justify-between p-5">
    <div className="border flex justify-around w-[950px]">
<div className="flex gap-x-4">
<div className="border w-[180px] h-[170px] p-5">
        <img src="https://m.media-amazon.com/images/I/51+hM65yflL._AC_AA220_.jpg" className="w-full h-full border object-contain" />
        </div>
        <div className="border flex flex-col justify-between p-3">
            <h1>Centrino Men's 3322 Black Sneakers_6 UK (3389-01)</h1>
            <p>In stock</p>
            <p>Eligible for FREE Shipping</p>
            <p>Size: 6 UK</p>
            <div className="border w-40 h-10 flex rounded-full justify-around items-center">
                <button>-</button>
                <p>1</p>
                <button>+</button>
            </div>
        </div>
</div>
        <p className='border w-2/12 flex justify-center items-center'>₹899.00</p>

        <p className='border w-2/12 flex justify-center items-center'>Delete</p>
    </div>

    <div className="border p-5">
        <p>Subtotal (4 items): ₹1,040.00</p>
    </div>
</div>
</div>
    </div>
  )
}

export default Cart
