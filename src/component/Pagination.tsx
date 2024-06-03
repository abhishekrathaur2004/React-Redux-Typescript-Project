import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage,totalPages, onPageChange}) => {
    
    
    const handlePrevious = () => {
        if (currentPage > 1) {
        //  console.log(currentPage)
          onPageChange(currentPage - 1);
        }
      };
    
      const handleNext = () => {
        
        if (currentPage < totalPages) {
          
          onPageChange(currentPage + 1);
        }
      };
    
      const handlePageClick = (page: number) => {
        // console.log(page);
        onPageChange(page);
      };
    //   console.log(currentPage)
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center my-4">
      <button
        className="mx-1 px-3 py-1 rounded bg-gray-200"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className="mx-1 px-3 py-1 rounded bg-gray-200"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
