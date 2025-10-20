import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should call onSearch when form is submitted with query', () => {
    const mockOnSearch = vi.fn();
    render(<Header onSearch={mockOnSearch} />);

    const searchInputs = screen.getAllByTestId('search-input');
    const searchForms = screen.getAllByTestId('search-form');

    fireEvent.change(searchInputs[0], { target: { value: 'batman' } }); // Usa o primeiro input (desktop)
    fireEvent.submit(searchForms[0]); // Usa o primeiro form (desktop)

    expect(mockOnSearch).toHaveBeenCalledWith({ query: 'batman' });
  });

  it('should call onNavigate when home button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<Header onNavigate={mockOnNavigate} />);

    const homeButtons = screen.getAllByTestId('nav-home');
    fireEvent.click(homeButtons[0]); // Clica no primeiro botão (desktop)

    expect(mockOnNavigate).toHaveBeenCalledWith({ page: 'home' });
  });

  it('should call onNavigate when favorites button is clicked', () => {
    const mockOnNavigate = vi.fn();
    render(<Header onNavigate={mockOnNavigate} />);

    const favoritesButtons = screen.getAllByTestId('nav-favorites');
    fireEvent.click(favoritesButtons[0]); // Clica no primeiro botão (desktop)

    expect(mockOnNavigate).toHaveBeenCalledWith({ page: 'favorites' });
  });
});
