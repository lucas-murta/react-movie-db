import type { ReactNode } from 'react';
import type { Movie } from '../../services/types';

export interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
  favoritesCount: number;
}

export interface FavoritesProviderProps {
  children: ReactNode;
}
