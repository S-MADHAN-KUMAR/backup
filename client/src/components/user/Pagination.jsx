import React, { useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 3;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className=" w-full sm:p-2 bg-[#f2f3f500]">

   <div className=" w-fit mr-auto sm:ms-5 ms-3 ">  
      <div className="flex font-oswald tracking-wider  items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`w-[100px] sm:px-4 py-1 sm:w-[140px]  rounded-md ${
            currentPage === 1
             ? "text-white  border-blue-900 cursor-not-allowed bg-blue-900 border-2 text-lg"
              : "text-blue-400 border-gray-400 border-2 hover:bg-blue-100 text-lg"
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={` px-4 py-1 sm:border rounded ${
              currentPage === index + 1
                ? "text-white  border-blue-900 cursor-not-allowed bg-blue-900 border-2 text-lg "
              : "text-blue-400 border-gray-400 border-2 hover:bg-blue-100 text-lg"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-[100px] sm:px-4 py-1 sm:w-[140px] border rounded ${
            currentPage === totalPages
             ? "text-white  border-blue-900 cursor-not-allowed bg-blue-900 border-2 text-lg"
              : "text-blue-400 border-gray-400 border-2 hover:bg-blue-100 text-lg"
          }`}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default Pagination;
