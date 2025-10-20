import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Search from './Search';
import { moviesService, type Movie } from '../../services';

vi.mock('../../services', () => ({
  moviesService: {
    searchMovies: vi.fn(),
  },
}));

vi.mock('../../lib/component', () => ({
  MovieCard: ({ movie }: { movie: Movie }) => (
    <div data-testid="movie-card">{movie.title}</div>
  ),
  Pagination: () => <div data-testid="pagination" />,
}));

const mockGet = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [{ get: mockGet }, vi.fn()],
  };
});

const mockMoviesService = vi.mocked(moviesService);

const mockSearchResponse = {
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

const renderSearch = () => {
  return render(
    <BrowserRouter>
      <Search />
    </BrowserRouter>
  );
};

describe('Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
    mockMoviesService.searchMovies.mockResolvedValue(mockSearchResponse);
  });

  it('should load search results successfully', async () => {
    mockGet.mockReturnValue('test');
    mockMoviesService.searchMovies.mockResolvedValue(mockSearchResponse);

    renderSearch();

    expect(screen.getByText('Buscando filmes...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test Movie')).toBeInTheDocument();
    });

    expect(mockMoviesService.searchMovies).toHaveBeenCalledWith({
      query: 'test',
      page: 1,
    });
  });
});
