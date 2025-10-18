import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MovieCard from './MovieCard';
import type { Movie } from '../../../services/types';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [1, 2, 3],
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MovieCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call onButtonClick with movie and variant when add button is clicked', () => {
    const mockOnButtonClick = vi.fn();

    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        variant="add"
        onButtonClick={mockOnButtonClick}
      />
    );

    const button = screen.getByTestId('movie-action-button');
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledWith(mockMovie, 'add');
  });

  it('should call onButtonClick with movie and variant when remove button is clicked', () => {
    const mockOnButtonClick = vi.fn();

    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        variant="remove"
        onButtonClick={mockOnButtonClick}
      />
    );

    const button = screen.getByTestId('movie-action-button');
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledWith(mockMovie, 'remove');
  });

  it('should navigate to /movie/:id when card is clicked', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);

    const card = screen.getByTestId('movie-card');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });
});
