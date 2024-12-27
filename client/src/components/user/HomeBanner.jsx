import React, { useState, useEffect } from 'react';
import bg1 from '../../assets/images/xx.png'
import bg2 from '../../assets/images/vv.png'
import bg3 from '../../assets/images/zz.png'
import bg4 from '../../assets/images/ff.png'


const HomeBanner = () => {
  const images = [bg1, bg2, bg3,bg4];
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(()=>{
    const randomImage = images[Math.floor(Math.random() * images.length)];
      setCurrentImage(randomImage);
  },[])


  return (
    <div className="z-10 relative left-1/2 transform -translate-x-1/2 h-[80vh] justify-center items-center  overflow-hidden  flex ">
      <img src={currentImage} alt="Banner" className="object-contain  w-full sm:h-[450px] h-[320px]" />
    </div>
  );
};

export default HomeBanner;

