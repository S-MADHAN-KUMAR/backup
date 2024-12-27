import React, { useEffect, useState } from "react";
import axios from 'axios'
import  { showToast } from '../../helper/toast.js'
import { showBlockConfirmation } from "../../helper/Sweat.js";
import { toast } from "react-toastify";

const Users = () => {
  const[ userData ,setUserData] = useState('')
  const fetchUsers=async()=>{
    try {
      const response = await axios.get('http://localhost:3000/admin/getUsers')
      if(response.status === 200){
        setUserData(response.data)
      }else{
        showToast(response.data.message)
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message)
    }
  }
  
  useEffect(()=>{
    fetchUsers() 
 
  },[])



  const handleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "block" : "active";
  

    const title = `Do you want to ${newStatus === "active" ? 'Unblock' : 'Block'} the user?`;
  
    showBlockConfirmation(title, newStatus, async () => {
      try {
   
        await axios.put('http://localhost:3000/admin/blockUser', { id, status: newStatus });

        fetchUsers();
        toast.success(`User has been ${newStatus === "active" ? 'unblocked' : 'blocked'}`);
      } catch (error) {
        console.error('Error blocking/unblocking user:', error);
        toast.error('Failed to update user status');
      }
    }, () => {
      console.log('Action canceled');
    });
  };
  

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Users List</h1>

      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full text-center text-sm">
          {/* Table Head */}
          <thead className="bg-gray-200 font-semibold tracking-wider">
            <tr>
              <th className="p-4">profile</th>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Registered On</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
         

          {/* Table Body */}
          <tbody>
            {userData && userData.length > 0 ? (
              userData.map((user, index) => (
                <tr key={index} className="border-b bg-gray-50">
                   <td className="p-4">
  <img
    src={user.profilePicture || "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"}
    alt="Profile"
    className="w-14 h-14 rounded-sm object-contain"
  />
</td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status === "active" ? "Active":"Block"}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      className={`px-8 py-3 text-[white] font-medium rounded-sm  ${
                        user.status === "active"
                          ? "bg-red-600"
                          : "bg-green-600 "
                      }`}
                      title="Block User"
                      onClick={() => handleBlock(user._id, user.status)}
                    >
                     {
                      user.status === "active" ? ' Block' : 'Unblock'
                     }
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
