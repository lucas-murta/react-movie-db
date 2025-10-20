import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination with correct number of pages', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('page-button-3')).toHaveClass('bg-secondary');
  });

  it('calls onPageChange when page button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByTestId('page-button-5'));
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByTestId('prev-page-button')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByTestId('next-page-button')).toBeDisabled();
  });

  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('navigates to first page when first page button is clicked', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByTestId('first-page-button'));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('navigates to last page when last page button is clicked', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByTestId('last-page-button'));
    expect(mockOnPageChange).toHaveBeenCalledWith(10);
  });
});
