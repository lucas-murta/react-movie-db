import { createContext, useState, useEffect } from 'react';
import type { Movie } from '../../services/types';
import type { FavoritesContextType, FavoritesProviderProps } from './types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = 'react-movie-db-favorites';

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const favoritesCount = favorites.length;

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
