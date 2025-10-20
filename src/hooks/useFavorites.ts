import { useContext } from 'react';
import FavoritesContext from '../contexts/FavoritesContext/FavoritesContext';
import type { FavoritesContextType } from '../contexts/FavoritesContext';

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useFavorites deve ser usado dentro de um FavoritesProvider'
    );
  }
  return context;
};
