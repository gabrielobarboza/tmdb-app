// src/hooks/__tests__/useMovieSort.test.ts

import { renderHook, act } from '@testing-library/react';
import { useMovieSort } from '../useMovieSort';
import { Movie } from '@/types';

// --- 1. Dados de Mock ---
const mockMovies: Movie[] = [
  { id: 1, title: 'B Movie', vote_average: 8.0, poster_path: '', backdrop_path: '', overview: '', release_date: '', vote_count: 100, genres: [], original_title: '', original_language: '' },
  { id: 2, title: 'C Movie', vote_average: 7.0, poster_path: '', backdrop_path: '', overview: '', release_date: '', vote_count: 100, genres: [], original_title: '', original_language: '' },
  { id: 3, title: 'A Movie', vote_average: 9.0, poster_path: '', backdrop_path: '', overview: '', release_date: '', vote_count: 100, genres: [], original_title: '', original_language: '' },
];

// --- 2. Conjunto de Testes ---
describe('useMovieSort Hook', () => {

  it('deve ordenar por título ascendente (A-Z) por padrão', () => {
    const { result } = renderHook(() => useMovieSort(mockMovies));

    // Verifica o tipo de ordenação inicial
    expect(result.current.sortType).toBe('title_asc');

    // Verifica a ordem dos filmes
    const sortedTitles = result.current.sortedMovies.map(m => m.title);
    expect(sortedTitles).toEqual(['A Movie', 'B Movie', 'C Movie']);
  });

  it('deve ordenar por título descendente (Z-A) quando o tipo de ordenação é alterado', () => {
    const { result } = renderHook(() => useMovieSort(mockMovies));

    // Altera o tipo de ordenação para 'title_desc'
    act(() => {
      result.current.setSortType('title_desc');
    });

    // Verifica o novo tipo de ordenação
    expect(result.current.sortType).toBe('title_desc');

    // Verifica a nova ordem dos filmes
    const sortedTitles = result.current.sortedMovies.map(m => m.title);
    expect(sortedTitles).toEqual(['C Movie', 'B Movie', 'A Movie']);
  });

  it('deve ordenar por nota descendente (maior para menor) quando o tipo de ordenação é alterado', () => {
    const { result } = renderHook(() => useMovieSort(mockMovies));

    // Altera o tipo de ordenação para 'rating_desc'
    act(() => {
      result.current.setSortType('rating_desc');
    });

    // Verifica o novo tipo de ordenação
    expect(result.current.sortType).toBe('rating_desc');

    // Verifica a nova ordem dos filmes (baseado na nota)
    const sortedRatings = result.current.sortedMovies.map(m => m.vote_average);
    expect(sortedRatings).toEqual([9.0, 8.0, 7.0]);
  });

  it('deve ordenar por nota ascendente (menor para maior) quando o tipo de ordenação é alterado', () => {
    const { result } = renderHook(() => useMovieSort(mockMovies));

    // Altera o tipo de ordenação para 'rating_asc'
    act(() => {
      result.current.setSortType('rating_asc');
    });

    // Verifica o novo tipo de ordenação
    expect(result.current.sortType).toBe('rating_asc');

    // Verifica a nova ordem dos filmes (baseado na nota)
    const sortedRatings = result.current.sortedMovies.map(m => m.vote_average);
    expect(sortedRatings).toEqual([7.0, 8.0, 9.0]);
  });

  it('deve retornar uma lista vazia se o input for um array vazio', () => {
    const { result } = renderHook(() => useMovieSort([]));

    expect(result.current.sortedMovies).toEqual([]);
    expect(result.current.sortedMovies.length).toBe(0);
  });
});
