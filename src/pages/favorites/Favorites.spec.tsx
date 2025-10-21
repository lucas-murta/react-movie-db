import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Favorites from './Favorites';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { ToastProvider } from '../../contexts/ToastContext';
import type { Movie } from '../../services/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>{component}</FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('Favorites Page', () => {
  const FAVORITES_STORAGE_KEY = 'react-movie-db-favorites';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should display empty state when no favorites exist', () => {
    renderWithRouter(<Favorites />);

    expect(
      screen.getByText('Você ainda não tem filmes favoritos')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Explore filmes e adicione aos seus favoritos clicando no ícone de coração'
      )
    ).toBeInTheDocument();
  });

  it('should display movie cards when favorites exist', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([mockMovie]));

    renderWithRouter(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByTestId('movie-card')).toBeInTheDocument();
    });

    expect(screen.getByText('Favoritos (1)')).toBeInTheDocument();
  });

  it('should remove movie card when movie is removed from favorites', async () => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([mockMovie]));

    renderWithRouter(<Favorites />);

    // Aguarda o card aparecer
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    // Clica no botão de remover
    const removeButton = screen.getByTestId('movie-action-button');
    fireEvent.click(removeButton);

    // Aguarda o card desaparecer e o estado vazio aparecer
    await waitFor(() => {
      expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
      expect(
        screen.getByText('Você ainda não tem filmes favoritos')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Favoritos (0)')).toBeInTheDocument();
  });

  it('should clear all favorites when clear button is clicked', async () => {
    const mockMovies = [
      mockMovie,
      { ...mockMovie, id: 2, title: 'Test Movie 2' },
    ];
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(mockMovies));

    renderWithRouter(<Favorites />);

    // Aguarda os cards aparecerem
    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
      expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Favoritos (2)')).toBeInTheDocument();

    // Clica no botão de limpar todos
    const clearButton = screen.getByText('Limpar Favoritos');
    fireEvent.click(clearButton);

    // Aguarda todos os cards desaparecerem
    await waitFor(() => {
      expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Movie 2')).not.toBeInTheDocument();
      expect(
        screen.getByText('Você ainda não tem filmes favoritos')
      ).toBeInTheDocument();
    });

    expect(screen.getByText('Favoritos (0)')).toBeInTheDocument();
  });

  it('should display correct favorites count in title', async () => {
    const mockMovies = [
      mockMovie,
      { ...mockMovie, id: 2, title: 'Test Movie 2' },
      { ...mockMovie, id: 3, title: 'Test Movie 3' },
    ];
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(mockMovies));

    renderWithRouter(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText('Favoritos (3)')).toBeInTheDocument();
    });
  });
});
