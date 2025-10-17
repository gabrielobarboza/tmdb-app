/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode
} from 'react';
import { type Movie } from '@/types/Movie';
import { FAVORITES_STORAGE_KEY } from '@/utils/storage';
import useLocalStorage from '@/hooks/useLocalStorage'; // Hook customizado!

import { favoritesReducer } from './reducer';
import {
  type FavoritesState,
  type FavoritesContextProps
} from './types';


// 1. Criação do Contexto
// O valor inicial é um objeto com as propriedades definidas, e as funções vazias.
const defaultContextValue: FavoritesContextProps = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorited: () => false,
};

export const FavoritesContext = createContext<FavoritesContextProps>(defaultContextValue);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  // Inicializamos com um array vazio, mas o estado real será carregado no useEffect
  const [favoritesState, dispatch] = useReducer(favoritesReducer, []);
  
  // Usando o hook de persistência para ler/gravar o estado
  // O LocalStorage salvará apenas a lista de filmes (favoritesState)
  const [storedFavorites, setStoredFavorites] = useLocalStorage<FavoritesState>(FAVORITES_STORAGE_KEY, []);
  
  // Efeito 1: Carregar o estado inicial do Local Storage para o Reducer
  useEffect(() => {
    if (storedFavorites.length > 0) {
      dispatch({ type: 'SET_INITIAL_STATE', payload: storedFavorites });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Roda apenas uma vez na montagem
  
  // Efeito 2: Persistir o estado no Local Storage sempre que o state mudar
  useEffect(() => {
    // Usamos o setter do useLocalStorage para persistir o estado atual
    setStoredFavorites(favoritesState);
  }, [favoritesState, setStoredFavorites]);


  // Funções de Despacho (Actions)
  const addFavorite = (movie: Movie) => {
    dispatch({ type: 'ADD_FAVORITE', payload: movie });
  };

  const removeFavorite = (movieId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  };

  const isFavorited = useCallback((movieId: number): boolean => {
    // Para performance, verifica se o filme está no estado
    return favoritesState.some(movie => movie.id === movieId);
  }, [favoritesState]);
  
  // O uso do useMemo garante que o objeto 'value' não mude a cada render, 
  // evitando re-renderizações desnecessárias nos consumidores. (Padrão Sênior)
  const contextValue = useMemo(() => ({
    favorites: favoritesState,
    addFavorite,
    removeFavorite,
    isFavorited,
  }), [favoritesState, isFavorited]);


  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};