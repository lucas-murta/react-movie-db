import { apiRequest } from './api';
import type {
  Movie,
  MoviesResponse,
  SearchMoviesParams,
  GenresResponse,
} from './types';

export const moviesService = {
  getDiscoveryMovies: async (page: number = 1): Promise<MoviesResponse> => {
    return apiRequest<MoviesResponse>('/discover/movie', {
      page,
      sort_by: 'popularity.desc',
      vote_count_gte: 1000,
      vote_average_gte: 6.0,
    });
  },

  searchMovies: async (params: SearchMoviesParams): Promise<MoviesResponse> => {
    return apiRequest<MoviesResponse>('/search/movie', { page: 1, ...params });
  },

  getMovieDetails: async (movieId: number): Promise<Movie> => {
    return apiRequest<Movie>(`/movie/${movieId}`);
  },

  getGenres: async (): Promise<GenresResponse> => {
    return apiRequest<GenresResponse>('/genre/movie/list');
  },
};
