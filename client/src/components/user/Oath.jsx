import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { showToast } from '../../../src/helper/toast.js';
import jwt_decode from 'jwt-decode'
import  { RegisterStart, RegisterSuccess, RegisterFailure } from '../../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Oath = () => {

  const dispatch = useDispatch();

const navigate=useNavigate()
  const handleGoogleLogin = async (credentialResponse) => {
    dispatch(RegisterStart)
    let credentialResponseData = jwt_decode(credentialResponse.credential);
    const data = {
      credential: credentialResponseData,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/user/oauth', data);
      console.log(response.data);
      dispatch(RegisterSuccess(response.data))
      showToast(response.data.message,'light','success');
      navigate('/')
    } catch (error) {
      dispatch(RegisterFailure())
      if (error.response && error.response.status === 403) {
        showToast('Access denied: User is blocked or inactive','dark','error');
      } else {
        showToast('Google authentication failed','dark','error');
      }
      console.error('Google login failed', error);
    }
  };
  
  return (


    <GoogleLogin 
  onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse)}
  onError={() => console.log('Login Failed')} 
  shape="rectangular"     
  text="continue_with" 
  width="200"          
/>
  );
};

export default Oath;
