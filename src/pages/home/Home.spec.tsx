import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { moviesService } from '../../services';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock do moviesService
vi.mock('../../services', () => ({
  moviesService: {
    getDiscoveryMovies: vi.fn(),
  },
}));

const mockMoviesService = vi.mocked(moviesService);

const mockMoviesResponse = {
  page: 1,
  results: [
    {
      id: 1,
      title: 'Test Movie',
      overview: 'Test overview',
      poster_path: '/test.jpg',
      backdrop_path: '/test-backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      vote_count: 1000,
      genre_ids: [28, 12],
    },
  ],
  total_pages: 1,
  total_results: 1,
};

const renderHome = () => {
  return render(
    <ToastProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </FavoritesProvider>
    </ToastProvider>
  );
};

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load movies successfully', async () => {
    mockMoviesService.getDiscoveryMovies.mockResolvedValueOnce(
      mockMoviesResponse
    );

    renderHome();

    expect(screen.getByText('Carregando filmes...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    expect(mockMoviesService.getDiscoveryMovies).toHaveBeenCalledWith(1);
  });
});
