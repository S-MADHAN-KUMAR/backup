import React, { useState } from 'react';
import Footer from '../../components/user/Footer';
import adminValidate from './adminValidates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminLoginFailure, AdminLoginStart, AdminLoginSuccess } from '../../redux/admin/adminSlice';

const Login = () => {
  const dispatch = useDispatch()
  const [msg,setMsg]=useState('')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
  dispatch(AdminLoginStart())
    console.log('Form data being sent:', formData); 
  
    const validationErrors = adminValidate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3000/admin/login', formData);
      setMsg(res.data.message);
      dispatch(AdminLoginSuccess(res.data.admin))
      if (res.data.success) navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error response:', error.response?.data);
      setMsg(error.response?.data?.message || 'An error occurred');
      dispatch(AdminLoginFailure(error.response?.data))
    }
  };
  
  
  
  

  return (
    <div>
      <div className="overflow-hidden">
        <div className="h-[120vh] w-[1366px] flex justify-between bg-black">
          <form noValidate onSubmit={handleSubmit} className="flex flex-col mx-auto">
            <h1 className="mt-12 mx-auto mb-20 font-audiowide stroke-orange text-6xl uppercase">
              ADMIN LOGIN
            </h1>

            <p className='text-lg text-red-600'>{msg}</p>

            <div className="mb-12">
              <input
                type="email"
                placeholder="EMAIL"
                className="bg-gray-900 w-full p-3 rounded-sm mb-2 placeholder:font-audiowide text-white font-baseline placeholder:text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-20">
              <input
                type="password"
                placeholder="PASSWORD"
                className="bg-gray-900 w-full p-3 rounded-sm mb-2 placeholder:font-audiowide text-white font-baseline placeholder:text-sm"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <button className="border-[#A3E81D] hover:text-black hover:bg-[#A3E81D] w-2/3 mx-auto border-2 rounded-md px-6 py-2 font-audiowide tracking-wider text-[#A3E81D]">
              LOGIN
            </button>
          </form>

          <div className="bg-white w-1/2 p-5">
            <img src="https://i.pinimg.com/originals/3d/36/04/3d3604154ad5713bc7e945e80d084c83.gif" className="mt-20 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
