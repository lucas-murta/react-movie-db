import { createContext, useState, useEffect, useRef } from 'react';
import type { Movie } from '../../services/types';
import type { FavoritesContextType, FavoritesProviderProps } from './types';
import { useToast } from '../../hooks/useToast';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = 'react-movie-db-favorites';

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { showError, showSuccess } = useToast();
  const showErrorRef = useRef(showError);
  const showSuccessRef = useRef(showSuccess);
  showErrorRef.current = showError;
  showSuccessRef.current = showSuccess;

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch {
      showErrorRef.current('Erro', 'Não foi possível carregar os favoritos');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      showErrorRef.current('Erro', 'Não foi possível salvar os favoritos');
    }
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, movie];
    });
    showSuccessRef.current('Sucesso', 'Filme adicionado aos favoritos');
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
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
