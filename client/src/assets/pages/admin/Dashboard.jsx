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
import { Link, Outlet, useLocation } from "react-router-dom";
import Home from '../../components/admin/Home'

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();

  
  const toggleSidebar = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex overflow-hidden">
      <div
        className={`${
          open ? "w-[20vw] bg-[#91e3f060]" : "w-[5vw] bg-[#cde6e960]"
        } aside h-[100vh] px-3 py-2 overflow-hidden duration-500 flex flex-col`}
      >
        <Link
          to="/admin/dashboard"
          className="flex items-center justify-between h-[10vh]"
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

        <div className="font-oswald tracking-widest font-medium uppercase h-[70vh] flex flex-col justify-around">
          {[
            { to: "/admin/dashboard/products", icon: <IoBagHandleSharp />, label: "Products" },
            { to: "/admin/dashboard/orders", icon: <FaCartShopping />, label: "Orders" },
            { to: "/admin/dashboard/coupons", icon: <IoTicket />, label: "Coupons" },
            { to: "/admin/dashboard/users", icon: <FaUserLarge />, label: "Users" },
            { to: "/admin/dashboard/banners", icon: <BsTagsFill />, label: "Banners" },
            { to: "/admin/dashboard/reviews", icon: <BiCommentDetail />, label: "Reviews" },
            { to: "/admin/dashboard/categories", icon: <AiFillProduct />, label: "Categories" },
            { to: "/admin/dashboard/brands", icon: <MdStars />, label: "Brands" },
          ].map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 hover:bg-gray-200 p-2 rounded-md ${
                location.pathname === to ? "bg-gray-300" : ""
              }`}
            >
              {icon}
              <h1 className={`${open ? "block" : "hidden"} text-sm`}>{label}</h1>
            </Link>
          ))}
        </div>

        <div className="h-[20vh] flex justify-center items-center">
          {open ? (
            <button className="bg-black text-white h-fit w-full p-2 rounded-sm flex justify-center font-oswald uppercase text-xl tracking-wider">
              Logout
            </button>
          ) : (
            <IoMdExit className="w-7 h-9 cursor-pointer" />
          )}
        </div>
      </div>

      <div className="w-[80vw] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard;
