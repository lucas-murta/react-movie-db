export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

export interface DiscoverMoviesParams {
  page?: number;
  sort_by?: string;
  with_genres?: string;
  year?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  vote_count_lte?: number;
}
