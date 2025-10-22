import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePopularMovies, usePopularMoviesInfinite, useMovieDetails, useSearchMoviesInfinite } from '../useTmdb';
import tmdbClient from '@/api/tmdb';
import { Movie } from '@/types';
import React from 'react';

// Mock do tmdbClient
jest.mock('@/api/tmdb', () => ({
  __esModule: true,
  default: {
    getPopularMovies: jest.fn(),
    getMovieDetails: jest.fn(),
    searchMovies: jest.fn(),
  },
}));

const mockTmdbClient = tmdbClient as jest.Mocked<typeof tmdbClient>;

// Mock de um filme completo seguindo a interface Movie
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Test Overview',
  release_date: '2024-01-01',
  vote_average: 7.5,
  vote_count: 100,
  genres: [{ id: 1, name: 'Action' }],
  original_title: 'Original Test Movie',
  original_language: 'en',
};

const mockMovie2: Movie = {
  ...mockMovie,
  id: 2,
  title: 'Test Movie 2',
};

describe('TMDB Hooks', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  describe('usePopularMovies', () => {
    const mockPopularMoviesResponse = {
      page: 1,
      results: [mockMovie, mockMovie2],
      total_pages: 2,
      total_results: 40,
    };

    it('deve buscar filmes populares corretamente', async () => {
      mockTmdbClient.getPopularMovies.mockResolvedValueOnce(mockPopularMoviesResponse);

      const { result } = renderHook(() => usePopularMovies(1), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockTmdbClient.getPopularMovies).toHaveBeenCalledWith(1);
      expect(result.current.data).toEqual(mockPopularMoviesResponse);
    });

    it('deve lidar com erros na busca de filmes populares', async () => {
      const error = new Error('Failed to fetch');
      mockTmdbClient.getPopularMovies.mockRejectedValueOnce(error);

      const { result } = renderHook(() => usePopularMovies(1), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeDefined();
      expect(result.current.error?.message).toBe('Failed to fetch');
    });
  });

  describe('usePopularMoviesInfinite', () => {
    const mockInfiniteResponse = {
      page: 1,
      results: [mockMovie],
      total_pages: 2,
      total_results: 20,
    };

    it('deve buscar filmes populares com infinite scroll', async () => {
      mockTmdbClient.getPopularMovies.mockResolvedValueOnce(mockInfiniteResponse);

      const { result } = renderHook(() => usePopularMoviesInfinite(), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockTmdbClient.getPopularMovies).toHaveBeenCalledWith(1);
      expect(result.current.data?.pages[0]).toEqual(mockInfiniteResponse);
    });
  });

  describe('useMovieDetails', () => {
    it('deve buscar detalhes do filme corretamente', async () => {
      mockTmdbClient.getMovieDetails.mockResolvedValueOnce(mockMovie);

      const { result } = renderHook(() => useMovieDetails(1), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockTmdbClient.getMovieDetails).toHaveBeenCalledWith(1);
      expect(result.current.data).toEqual(mockMovie);
    });

    it('deve lidar com erros na busca de detalhes', async () => {
      const error = new Error('Movie not found');
      mockTmdbClient.getMovieDetails.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useMovieDetails(1), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('Movie not found');
    });

    it('não deve buscar quando o ID é inválido', () => {
      renderHook(() => useMovieDetails(0), { wrapper });

      expect(mockTmdbClient.getMovieDetails).not.toHaveBeenCalled();
    });
  });

  describe('useSearchMoviesInfinite', () => {
    const mockSearchResponse = {
      page: 1,
      results: [mockMovie],
      total_pages: 2,
      total_results: 20,
    };

    it('deve buscar filmes com base na query', async () => {
      mockTmdbClient.searchMovies.mockResolvedValueOnce(mockSearchResponse);

      const { result } = renderHook(() => useSearchMoviesInfinite('test'), { wrapper });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(mockTmdbClient.searchMovies).toHaveBeenCalledWith('test', 1);
      expect(result.current.data?.pages[0]).toEqual(mockSearchResponse);
    });

    it('não deve buscar quando a query está vazia', () => {
      renderHook(() => useSearchMoviesInfinite(''), { wrapper });

      expect(mockTmdbClient.searchMovies).not.toHaveBeenCalled();
    });

    it('deve lidar com erros na busca', async () => {
      const error = new Error('Search failed');
      mockTmdbClient.searchMovies.mockRejectedValueOnce(error);

      const { result } = renderHook(() => useSearchMoviesInfinite('test'), { wrapper });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error?.message).toBe('Search failed');
    });
  });
});