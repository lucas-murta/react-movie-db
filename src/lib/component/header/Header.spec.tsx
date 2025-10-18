import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should call onSearch when form is submitted with query', () => {
    const mockOnSearch = vi.fn();
    render(<Header onSearch={mockOnSearch} />);

    const searchInput = screen.getByTestId('search-input');
    const searchForm = screen.getByTestId('search-form');

    fireEvent.change(searchInput, { target: { value: 'batman' } });
    fireEvent.submit(searchForm);

    expect(mockOnSearch).toHaveBeenCalledWith({ query: 'batman' });
  });

  it('should call onNavigate when home button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<Header onNavigate={mockOnNavigate} />);

    const homeButton = screen.getByTestId('nav-home');
    fireEvent.click(homeButton);

    expect(mockOnNavigate).toHaveBeenCalledWith({ page: 'home' });
  });

  it('should call onNavigate when favorites button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<Header onNavigate={mockOnNavigate} />);

    const favoritesButton = screen.getByTestId('nav-favorites');
    fireEvent.click(favoritesButton);

    expect(mockOnNavigate).toHaveBeenCalledWith({ page: 'favorites' });
  });
});
