import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight, HiPlay } from "react-icons/hi";
import product1 from "../../assets/img/1.png";
import product2 from "../../assets/img/2.png";
import product3 from "../../assets/img/3.png";

const ShoeCarousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      img: product1,
      category: "Sport Shoes",
      title: "NIKE D.01",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis.",
    },
    {
      img: product2,
      category: "Sport Shoes",
      title: "NIKE D.02",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis.",
    },
    {
      img: product3,
      category: "Sport Shoes",
      title: "NIKE D.03",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis.",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
        handleNext()
      
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
        <div className="absolute left-5 bottom-8 z-10 hidden md:flex">
      <div className="relative w-[820px] h-[370px]  rounded-[20px] overflow-hidden shadow-lg bg-[radial-gradient(ellipse_at_center,_#2b2e4f,_#111126)]">
        {/* Carousel Section */}
        <section className="carousel relative flex items-center justify-center w-full h-full">
          <div className="list relative w-full h-full">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 flex items-center gap-4 transition-all duration-500 ${
                  currentIndex === index ? "opacity-100" : "opacity-0"
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  x: currentIndex === index ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Product Image */}
                <figure className="w-1/2 flex justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[2000px] h-auto transform rotate-[-25deg] shadow-lg "
                  />
                </figure>
                {/* Product Content */}
                <div className=" content w-1/2 flex flex-col items-start space-y-2">
                  <p className="category text-teal-300 uppercase tracking-wide font-semibold text-sm">
                    {item.category}
                  </p>
                  <h2 className="font-oswald text-white  text-7xl font-bold">{item.title}</h2>
                  <p className="description text-white/70 text-sm max-w-[250px]">
                    {item.description}
                  </p>
                  <div className="flex space-x-2">
                    <button className="cursor-pointer  btn tracking-widest text-lg font-oswald">
                      Add To Cart
                    </button>
                    <button className="cursor-pointer  btn tracking-widest text-lg font-oswald">
                       See More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="arrows absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-600"
            >
              <HiChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center hover:bg-indigo-600"
            >
              <HiChevronRight size={20} />
            </button>
          </div>

        </section>
      </div>
    </div>

  );
};

export default ShoeCarousel2;
