import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Make sure to import useSelector
import axios from 'axios';

const ProtectedRoute = ({ children, isProtectedForLoggedIn = false }) => {
  const { currentUser } = useSelector((state) => state.user); 
  const [currUser, setCurrUser] = useState(null);

  const fetchCurrUser = async () => {
    const id = currentUser?.user?._id; 
    try {
      const res = await axios.get(`http://localhost:3000/user/getCurrentUser?id=${id}`);
  
      if (res.status === 200) {
        const fetchedUser = res.data.currentUser;
        console.log(fetchedUser);
  
        if (fetchedUser.status === 'block') {
          setCurrUser(null);
          console.log('User blocked....');
        }else{
          setCurrUser(fetchedUser);
        }

      }
    } catch (error) {
      console.error('Error in fetchCurrUser:', error.message);
    }
  };
  useEffect(()=>{
    fetchCurrUser()
  },[currentUser])

  if (isProtectedForLoggedIn) {
    if (currUser?.isVerified) {
      return <Navigate to="/" />;
    }
  } else {
    if (!currUser?.isVerified) {
      return <Navigate to="/login" />;
    }
  }

  return children; 
};

export default ProtectedRoute;