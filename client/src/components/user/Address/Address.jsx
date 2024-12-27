import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Address = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [address, setAddress] = useState([])
  const id = currentUser?.user?._id

  const fetchAddress = async () => {
    try {
      const id = currentUser?.user?._id
      const res = await axios.get(`http://localhost:3000/user/getAddress/${id}`)
      if (res.status === 200) {
        setAddress(res.data.address) 
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchAddress()
  }, [currentUser]) 

  return (
    <div className='border h-full p-5'>
      <h1 className='font-audiowide text-3xl uppercase mb-20'>Address settings</h1>
     <div className="flex border p-5 mb-12 justify-around">
     {address.length > 0 ? (
        <>
         {address.map((address, index) => {
    const id = address._id;
    return (
        <div className="border p-4 font-Robot gap-x-12 w-1/3" key={index}>
            <h1>name : {address.name}</h1>
            <p>{address.phone}</p>
            <p>{address.addressline1}</p>
            <p>{address.addressline2}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.pincode}</p>
            <a href={`/profile/edit_address/${id}`} className="btn ms-8">Edit Address +</a>
        </div>
    );
})}

        </>
      ) : (
        <>No address available</>
      )}

     </div>
      <a href='/profile/add_address' className='btn'>Add Address +</a>
    </div>
  )
}

export default Address
