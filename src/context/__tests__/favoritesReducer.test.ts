// src/context/__tests__/favoritesReducer.test.ts

import { favoritesReducer } from '../FavoritesContext/reducer';
import { FavoritesAction, FavoritesState, ActionType } from '../FavoritesContext/types';
import { Movie } from '@/types/Movie';

// --- 1. Dados de Mock (Simulando a estrutura do Movie) ---
const mockMovie1: Movie = {
  id: 101,
  title: 'Filme A',
  poster_path: '/a.jpg',
  backdrop_path: '/b.jpg',
  overview: 'Sinopse A',
  release_date: '2023-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genres: [],
  original_title: 'Movie A',
  original_language: 'en',
};

const mockMovie2: Movie = {
  id: 102,
  title: 'Filme B',
  poster_path: '/c.jpg',
  backdrop_path: '/d.jpg',
  overview: 'Sinopse B',
  release_date: '2023-02-01',
  vote_average: 7.2,
  vote_count: 50,
  genres: [],
  original_title: 'Movie B',
  original_language: 'en',
};

const initialState: FavoritesState = [];

// --- 2. Conjunto de Testes ---
describe('favoritesReducer', () => {

  test('deve retornar o estado inicial quando o estado anterior é undefined', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as FavoritesAction;
    // O reducer deve retornar o estado inicial (array vazio) se o estado for undefined
    expect(favoritesReducer(undefined as unknown as FavoritesState, unknownAction)).toEqual([]);
  });

  test('deve retornar o estado atual se uma ação desconhecida for passada', () => {
    const currentState: FavoritesState = [mockMovie1];
    const unknownAction = { type: 'UNKNOWN_ACTION' } as unknown as FavoritesAction;
    // O reducer não deve alterar o estado para uma ação desconhecida
    expect(favoritesReducer(currentState, unknownAction)).toEqual(currentState);
  });

  // Testa a ação de SET_INITIAL_STATE (Carregar do Local Storage)
  test('deve carregar um estado inicial do payload (SET_INITIAL_STATE)', () => {
    const loadedState: FavoritesState = [mockMovie1, mockMovie2];
    const action = {
      type: ActionType.SET_INITIAL_STATE,
      payload: loadedState,
    } as FavoritesAction;

    const newState = favoritesReducer(initialState, action);
    expect(newState).toEqual(loadedState);
    expect(newState.length).toBe(2);
  });

  // Testa a ação de ADD_FAVORITE
  describe('ADD_FAVORITE', () => {
    test('deve adicionar um filme ao estado vazio', () => {
      const action = {
        type: ActionType.ADD_FAVORITE,
        payload: mockMovie1,
      } as FavoritesAction;

      const newState = favoritesReducer(initialState, action);
      expect(newState).toEqual([mockMovie1]);
      expect(newState.length).toBe(1);
    });

    test('deve adicionar um filme a um estado com itens existentes', () => {
      const stateWithOneItem: FavoritesState = [mockMovie1];
      const action = {
        type: ActionType.ADD_FAVORITE,
        payload: mockMovie2,
      } as FavoritesAction;

      const newState = favoritesReducer(stateWithOneItem, action);
      expect(newState).toEqual([mockMovie1, mockMovie2]);
      expect(newState.length).toBe(2);
    });

    test('não deve adicionar um filme duplicado', () => {
      const stateWithDuplicate: FavoritesState = [mockMovie1];
      const action = {
        type: ActionType.ADD_FAVORITE,
        payload: mockMovie1, // Tentando adicionar o mesmo filme
      } as FavoritesAction;

      const newState = favoritesReducer(stateWithDuplicate, action);
      expect(newState).toEqual([mockMovie1]); // O estado deve permanecer o mesmo
      expect(newState.length).toBe(1);
    });
  });

  // Testa a ação de REMOVE_FAVORITE
  describe('REMOVE_FAVORITE', () => {
    const stateWithTwoItems: FavoritesState = [mockMovie1, mockMovie2];

    test('deve remover um filme existente pelo ID', () => {
      const action = {
        type: ActionType.REMOVE_FAVORITE,
        payload: mockMovie1.id, // ID 101
      } as FavoritesAction;

      const newState = favoritesReducer(stateWithTwoItems, action);
      expect(newState).toEqual([mockMovie2]);
      expect(newState.length).toBe(1);
    });

    test('não deve alterar o estado se o ID não for encontrado', () => {
      const action = {
        type: ActionType.REMOVE_FAVORITE,
        payload: 999, // ID Inexistente
      } as FavoritesAction;

      const newState = favoritesReducer(stateWithTwoItems, action);
      expect(newState).toEqual(stateWithTwoItems); // O estado deve ser o mesmo
      expect(newState.length).toBe(2);
    });

    test('deve retornar um array vazio se o último item for removido', () => {
      const stateWithOneItem: FavoritesState = [mockMovie1];
      const action = {
        type: ActionType.REMOVE_FAVORITE,
        payload: mockMovie1.id,
      } as FavoritesAction;

      const newState = favoritesReducer(stateWithOneItem, action);
      expect(newState).toEqual([]);
      expect(newState.length).toBe(0);
    });
  });
});