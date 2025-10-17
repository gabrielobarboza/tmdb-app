import type { Movie } from '@/types/Movie';

// O Estado Global (um array de filmes favoritos)
export type FavoritesState = Movie[];

// Tipos de Ação (o que o reducer pode fazer)
export type FavoritesActionType =
  | 'ADD_FAVORITE'
  | 'REMOVE_FAVORITE'
  | 'SET_INITIAL_STATE'; // Usado para carregar do Local Storage

// Interface base para as Ações
export type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Movie }
  | { type: 'REMOVE_FAVORITE'; payload: number } // payload é o movie ID
  | { type: 'SET_INITIAL_STATE'; payload: Movie[] };

// Define a estrutura do Contexto que será exposto aos componentes
export interface FavoritesContextProps {
  favorites: FavoritesState;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorited: (movieId: number) => boolean;
}

export const ActionType: Record<FavoritesActionType, FavoritesActionType>= {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_INITIAL_STATE: 'SET_INITIAL_STATE',
}


