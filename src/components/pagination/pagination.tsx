import React from 'react';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    changePage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, changePage }) => {
    return (
        <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                    key={number}
                    onClick={() => changePage(number)}
                    className={`mx-1 px-3 py-1 rounded border ${currentPage === number ? 'border-blue-500' : 'border-gray-300'}`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
