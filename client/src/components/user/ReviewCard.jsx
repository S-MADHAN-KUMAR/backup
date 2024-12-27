import React from 'react'
import { MdStar } from 'react-icons/md'

const ReviewCard = () => {
  return (
    <div className='p-4 mb-6 bg-white shadow sm:w-[850px] w-[300px]'>
     <div className='  flex gap-x-4 items-center mb-2'>
        <img src="https://media.themoviedb.org/t/p/w500/uySCXY4TZxEDcVJD8WOjDQmMHc9.jpg" className="w-16 h-16 object-cover rounded-full  " />
        <h1 className='font-oswald text-lg tracking-wide text-blue-800 font-semibold'>tovina thomas</h1>
     </div>
     <div className="text-yellow-400 flex gap-x-1 w-fit">
            <MdStar className=" w-4 h-4" />
            <MdStar className=" w-4 h-4" />
            <MdStar className=" w-4 h-4" />
            <MdStar className=" w-4 h-4" />
            <MdStar className=" w-4 h-4" />
          </div>

{/* raing description */}
         <div >
         <p className='text-gray-500 font-oswald text-sm tracking-wide mb-2 '>27 , June , 2024</p>

<h1 className='text-red-600 font-oswald text-xl tracking-wide font-semibold mb-3'>Good One</h1>

<p >I get it at 999 and used for 1 day I must say the earbuds are pretty good but one thing I didn't like is that it has Bluetooth 5.1 but no problem sound quality until now I found that its great and bass is normal not too high or not too low coming to Calls best earbuds if you are buying for call each and every word</p>


<div className='mt-8 flex gap-4  flex-wrap'>
    <img src="https://m.media-amazon.com/images/I/61D2rmjcrLL._AC_AIweblab943502,T4_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews" className="sm:w-28 sm:h-28 w-16 h-16" />
    <img src="https://m.media-amazon.com/images/I/81wJt5lrbML._AC_AIweblab943502,T4_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews" className="sm:w-28 sm:h-28 w-16 h-16" />
    <img src="https://m.media-amazon.com/images/I/81paFD3bz9L._AC_AIweblab943502,T4_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews" className="sm:w-28 sm:h-28 w-16 h-16"/>
    <img src="https://m.media-amazon.com/images/I/714KS4pK93L._AC_AIweblab943502,T4_UC154,154_CACC,154,154_QL85_.jpg?aicid=community-reviews" className="sm:w-28 sm:h-28 w-16 h-16" />

</div>
         </div>
     
    </div>
  )
}

export default ReviewCard
