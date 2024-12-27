import React from 'react'
import {motion} from 'framer-motion'
import advbg1 from '../../assets/adv-bg-1.png'
import advbg2 from '../../assets/adv-bg-2.png'
import ShoeCarousel from '../user/ShoeCarousel'
import ShoeCarousel2 from '../user/ShoeCarousel2'

const Advertisement = () => {
  return (
    <div className='md:flex justify-center items-center h-[900px] w-[1366px] bg-black overflow-hidden'>
     <div className='relative default-size'>
     <motion.h1
      className="font-Roboto text-[#A3E81D] text-[45px] md:text-[59px] flex-col font-extrabold tracking-wide p-3 md:w-2/3 text-shadow-blink"
      animate={{ opacity: [1, 0, 1] }} 
      transition={{
        duration: 1, 
        repeat: Infinity, 
      }}
    >
      CONQUER LIMITS, BUILD YOUR LEGACY – SALE NOW ON!
    </motion.h1>

<ShoeCarousel/>

<ShoeCarousel2/>

      <img src={advbg1} alt=""  className='absolute md:-bottom-28
      md:h-[150px]  -right-48 top-18'/>
      <img src={advbg2} alt=""  className='absolute -left-40 -bottom-[300px] md:-bottom-0 '/>
      <img src={advbg1} alt=""  className='absolute -top-56
      h-[150px] -left-32'/>
     </div>
    </div>
  )
}

export default Advertisement
