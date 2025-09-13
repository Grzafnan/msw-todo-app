import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

interface TodoPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TodoPagination: React.FC<TodoPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((page, index, array) => array.indexOf(page) === index);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        className={`${currentPage === 1 ? 'text-red-600 border-red-600 dark:border-red-600 cursor-not-allowed opacity-50' : 'text-gray-700 dark:text-gray-300'}`}
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`min-w-[2.5rem] ${currentPage === page ? '' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {page}
            </Button>
          )}
        </React.Fragment>
      ))}

      <Button
        className={`${currentPage === totalPages  ? 'text-red-600 border-red-600 dark:border-red-600 cursor-not-allowed opacity-50' : 'text-gray-700 dark:text-gray-300'}`}
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default TodoPagination;