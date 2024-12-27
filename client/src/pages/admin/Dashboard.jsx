import React, { useState } from 'react'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { IoBagHandleSharp, IoTicket } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { BsTagsFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { MdStars } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { Link, Outlet, useLocation  } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { AdminLogout } from '../../redux/admin/adminSlice';

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch()

  const handleLogout = async()=>{
dispatch(AdminLogout())
  }
  const toggleSidebar = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex overflow-hidden">
      <div
        className={`${
          open ? "w-[20vw] bg-[#91e3f060]" : "w-[5vw] bg-[#cde6e960]"
        } aside h-[100vh]  py-2 overflow-hidden duration-500 flex flex-col`}
      >
        <Link
          to="/admin/dashboard"
          className={open?"flex items-center justify-between h-[10vh] px-2 ":"flex items-center justify-between h-[10vh] mx-auto "}
        >
          <h1 className={`${open ? "block" : "hidden"} font-audiowide text-2xl uppercase`}>
            Dashboard
          </h1>
          {open ? (
            <FaAngleDoubleLeft
              onClick={toggleSidebar}
              className="w-6 h-6 cursor-pointer"
            />
          ) : (
            <FaAngleDoubleRight
              onClick={toggleSidebar}
              className="w-6 h-6 cursor-pointer"
            />
          )}
        </Link>

        <div className=" font-Roboto font-semibold tracking-widest uppercase h-[70vh] flex flex-col justify-around">
          {[
            { to: "/admin/dashboard/products", icon: <IoBagHandleSharp className='w-5 h-5' />, label: "Products" },
            { to: "/admin/dashboard/orders", icon: <FaCartShopping className='w-5 h-5' />, label: "Orders" },
            { to: "/admin/dashboard/coupons", icon: <IoTicket className='w-5 h-5' />, label: "Coupons" },
            { to: "/admin/dashboard/users", icon: <FaUserLarge className='w-5 h-5' />, label: "Users" },
            { to: "/admin/dashboard/banners", icon: <BsTagsFill className='w-5 h-5' />, label: "Banners" },
            { to: "/admin/dashboard/brands", icon: <BsTagsFill className='w-5 h-5' />, label: "Brands" },
            { to: "/admin/dashboard/reviews", icon: <BiCommentDetail className='w-5 h-5' />, label: "Reviews" },
            { to: "/admin/dashboard/categories", icon: <AiFillProduct className='w-5 h-5' />, label: "Categories" },
            { to: "/admin/dashboard/brands", icon: <MdStars className='w-5 h-5' />, label: "Brands" },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 hover:bg-gray-100 p-3 rounded-l-md ms-3 ${
                location.pathname === to ? "bg-[white] " : ""
              }`}
            >
              {icon}
              <h1 className={`${open ? "block" : "hidden"} text-sm`}>{label}</h1>
            </Link>
          ))}
        </div>

        <div className="h-[20vh] px-3 flex justify-center items-center">
          {open ? (
            <button onClick={handleLogout} className="bg-black text-white h-fit w-full p-2 rounded-md flex justify-center font-Roboto uppercase tracking-wider">
              Logout
            </button>
          ) : (
            <IoMdExit className="w-7 h-9 cursor-pointer" />
          )}
        </div>
      </div>

      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard;
