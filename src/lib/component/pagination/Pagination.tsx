import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../base-component';
import type { PaginationProps } from './Pagination.types';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      data-testid="pagination"
    >
      {showFirstLast && !isFirstPage && (
        <Button
          variant="outline"
          color="primary"
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          iconButton={true}
          data-testid="first-page-button"
        >
          <FontAwesomeIcon icon={faAnglesLeft} className="text-sm" />
        </Button>
      )}
      {showPrevNext && (
        <Button
          variant="outline"
          color="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          iconButton={true}
          data-testid="prev-page-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
        </Button>
      )}
      {visiblePages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'solid' : 'text'}
          color="secondary"
          onClick={() => handlePageChange(page)}
          data-testid={`page-button-${page}`}
        >
          {page}
        </Button>
      ))}
      {showPrevNext && (
        <Button
          variant="outline"
          color="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          iconButton={true}
          data-testid="next-page-button"
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
        </Button>
      )}
      {showFirstLast && !isLastPage && (
        <Button
          variant="outline"
          color="primary"
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
          iconButton={true}
          data-testid="last-page-button"
        >
          <FontAwesomeIcon icon={faAnglesRight} className="text-sm" />
        </Button>
      )}
    </div>
  );
};

export default Pagination;
