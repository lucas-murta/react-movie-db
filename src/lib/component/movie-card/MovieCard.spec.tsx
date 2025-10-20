import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MovieCard from './MovieCard';
import type { Movie } from '../../../services/types';
import { FavoritesProvider } from '../../../contexts/FavoritesContext';

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
  return render(
    <FavoritesProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </FavoritesProvider>
  );
};

describe('MovieCard', () => {
  const FAVORITES_STORAGE_KEY = 'react-movie-db-favorites';

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should add movie to favorites when heart button is clicked', async () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);

    const button = screen.getByTestId('movie-action-button');
    fireEvent.click(button);

    await waitFor(() => {
      const favorites = JSON.parse(
        localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]'
      );
      expect(favorites).toHaveLength(1);
      expect(favorites[0]).toEqual(mockMovie);
    });
  });

  it('should remove movie from favorites when trash button is clicked', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([mockMovie]));

    renderWithRouter(<MovieCard movie={mockMovie} />);

    await waitFor(() => {
      const button = screen.getByTestId('movie-action-button');
      expect(button).toHaveAttribute('aria-label', 'Remover dos favoritos');
    });

    const button = screen.getByTestId('movie-action-button');
    fireEvent.click(button);

    await waitFor(() => {
      const favorites = JSON.parse(
        localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]'
      );
      expect(favorites).toHaveLength(0);
    });
  });

  it('should navigate to /movie/:id when card is clicked', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);

    const card = screen.getByTestId('movie-card');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith('/movie/1');
  });

  it('should display heart icon when movie is not in favorites', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />);

    const button = screen.getByTestId('movie-action-button');
    expect(button).toHaveAttribute('aria-label', 'Adicionar aos favoritos');
  });

  it('should display trash icon when movie is in favorites', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([mockMovie]));

    renderWithRouter(<MovieCard movie={mockMovie} />);

    await waitFor(() => {
      const button = screen.getByTestId('movie-action-button');
      expect(button).toHaveAttribute('aria-label', 'Remover dos favoritos');
    });
  });
});
