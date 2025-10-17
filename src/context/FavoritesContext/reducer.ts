import type { Movie } from '@/types';
import {
    ActionType,
    type FavoritesState,
    type FavoritesAction
} from './types';

// A função Reducer que manipula o estado imutavelmente
export const favoritesReducer = (
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState => {
  switch (action.type) {
    case ActionType.SET_INITIAL_STATE:
      // Ação usada pelo Provider para carregar o estado inicial do Local Storage
      return action.payload as Movie[];

    case ActionType.ADD_FAVORITE:
      // Evita duplicatas, mas o design button deve evitar isso
      if (state.some(({ id }) => id === (action.payload as Movie).id )) {
        return state;
      }
      // Retorna um novo array (imutabilidade)
      return [...state, action.payload as Movie] ; 

    case ActionType.REMOVE_FAVORITE:
      // Filtra o array, removendo o filme com o ID correspondente
      return state.filter(movie => movie.id !== action.payload);

    default:
      return state;
  }
};