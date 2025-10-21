import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesContext';

/**
 * Custom Hook para consumir o estado e as ações de Favoritos.
 * Garante que o hook seja usado apenas dentro do FavoritesProvider.
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (context === undefined) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  
  return context;
};