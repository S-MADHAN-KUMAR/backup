import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-black h-auto md:h-[600px] flex flex-col md:flex-row justify-center items-center overflow-hidden">
      <div className="bg-black p-6 md:p-10 mt-6 md:mt-12 w-full max-w-[1200px]">
        {/* Logo Section */}
        <p className="text-4xl md:text-4xl  md:text-left  mb-4 md:mb-8 font-bold text-white font-orbitron uppercase">
          gym <span className="font-audiowide text-transparent stroke-orange">RATS</span>
        </p>

        <hr className="border-gray-500" />

        <footer className="text-gray-400 font-oswald tracking-widest">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-10 tracking-widest ">
            <div>
              <p className=" text-2xl mb-4 text-white">Company</p>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Our Story</li>
                <li>Investors</li>
                <li>Suppliers</li>
              </ul>
            </div>

            <div>
              <p className=" text-2xl mb-4 text-white">Communities</p>
              <ul className="space-y-2">
                <li>For Fitness Enthusiasts</li>
                <li>Fitness Trainers</li>
                <li>Partners</li>
                <li>Investors</li>
                <li>Suppliers</li>
              </ul>
            </div>

            <div>
              <p className=" text-2xl mb-4 text-white">Useful links</p>
              <ul className="space-y-2">
                <li>Support</li>
                <li>Free Mobile App</li>
              </ul>
            </div>

            <div>
              <p className=" text-2xl mb-4 text-white">GYMRATS Plans</p>
              <ul className="space-y-2">
                <li>Premium Membership</li>
                <li>Group Training</li>
                <li>Family Plans</li>
                <li>Student Discounts</li>
                <li>Free Membership</li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-500 mt-8" />

          <div className="privacy-icons flex flex-col md:flex-row items-center justify-between mt-6 md:mt-12 text-center md:text-left">
            <div className="flex space-x-4">
              <button>
                <FaInstagram className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
              </button>
              <button>
                <FaTwitter className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
              </button>
              <button>
                <FaFacebook className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-orange-500" />
              </button>
            </div>
            <p className="mt-4 md:mt-0 text-white">© 2024 GYM RATS. All rights reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
