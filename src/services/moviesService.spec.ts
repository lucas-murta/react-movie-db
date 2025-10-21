import { describe, it, expect, vi, beforeEach } from 'vitest';
import { moviesService } from './moviesService';
import * as api from './api';

vi.mock('./api', () => ({
  apiRequest: vi.fn(),
}));

const mockApiRequest = vi.mocked(api.apiRequest);

describe('Movies Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  const mockMovieDetails = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test overview',
    poster_path: '/test.jpg',
    backdrop_path: '/test-backdrop.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
    vote_count: 1000,
    genre_ids: [28, 12],
  };

  const mockGenresResponse = {
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
    ],
  };

  describe('getDiscoveryMovies', () => {
    it('should fetch discovery movies', async () => {
      mockApiRequest.mockResolvedValueOnce(mockMoviesResponse);

      const result = await moviesService.getDiscoveryMovies();

      expect(mockApiRequest).toHaveBeenCalledWith('/discover/movie', {
        page: 1,
        sort_by: 'popularity.desc',
        vote_count_gte: 1000,
        vote_average_gte: 6.0,
        language: 'pt-BR',
      });
      expect(result).toEqual(mockMoviesResponse);
    });
  });

  describe('searchMovies', () => {
    it('should search movies', async () => {
      mockApiRequest.mockResolvedValueOnce(mockMoviesResponse);

      const params = { query: 'test movie' };
      await moviesService.searchMovies(params);

      expect(mockApiRequest).toHaveBeenCalledWith('/search/movie', {
        page: 1,
        language: 'pt-BR',
        query: 'test movie',
      });
    });
  });

  describe('getMovieDetails', () => {
    it('should fetch movie details', async () => {
      mockApiRequest.mockResolvedValueOnce(mockMovieDetails);

      const result = await moviesService.getMovieDetails(1);

      expect(mockApiRequest).toHaveBeenCalledWith('/movie/1', {
        language: 'pt-BR',
      });
      expect(result).toEqual(mockMovieDetails);
    });
  });

  describe('getGenres', () => {
    it('should fetch movie genres', async () => {
      mockApiRequest.mockResolvedValueOnce(mockGenresResponse);

      const result = await moviesService.getGenres();

      expect(mockApiRequest).toHaveBeenCalledWith('/genre/movie/list', {
        language: 'pt-BR',
      });
      expect(result).toEqual(mockGenresResponse);
    });
  });
});
