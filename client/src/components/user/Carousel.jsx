import React from "react";
import ProductCard from "./ProductCard";
import RunningTexts from "./RunningTexts";

const Carousel = () => {
  return (
    <div className="relative w-[1366px] h-[900px] overflow-hidden bg-blue-200 flex md:flex-row flex-col justify-center md:items-center ">
       <div className=" w-[100vw] h-[600px] overflow-x-scroll overflow-y-hidden  flex flex-row justify-around items-center gap-x-20 ps-14 pe-8 noScroll">


      <RunningTexts setting={{quotes:'trending products' , css:"font-audiowide text-transparent stroke-black  text-9xl",runSide:'right'
  , position:'absolute top-20'
}}/>

      <RunningTexts setting={{quotes:'trending products' , css:"font-audiowide text-black text-9xl",runSide:'left'
  , position:'absolute  top-[400px]'
}}/>

<RunningTexts setting={{quotes:'trending products' , css:"font-audiowide text-transparent stroke-white  text-9xl",runSide:'right'
  , position:'absolute bottom-20'
}}/>

    

       <ProductCard />
        <ProductCard />
        <ProductCard />
       </div>

      </div>
  );
};

export default Carousel;


