import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type Movie, type PaginatedResponse } from '@/types/Movie';
import { getPopularMovies } from '@/api/tmdb';

// Chave única para o cache do React Query
const MOVIE_KEYS = {
  popular: (page: number) => ['movies', 'popular', page],
  // ... adicionar chaves para 'details' ou 'search'
};

/**
 * Hook customizado para buscar filmes populares, usando React Query.
 * Gerencia loading, cache, e erros automaticamente.
 *
 * @param page Página atual para paginação ou Infinite Scroll
 */
export const usePopularMovies = (page: number): UseQueryResult<PaginatedResponse<Movie>, Error> => {
  return useQuery({
    // 1. Key: Chave única do cache
    queryKey: MOVIE_KEYS.popular(page), 
    
    // 2. Function: A função que chama a API
    queryFn: () => getPopularMovies(page), 

    // 3. Opções: Mantém os dados por 5 minutos (evita requisições repetidas)
    staleTime: 1000 * 60 * 5, 
  });
};

// ... Criar useMovieDetails e useSearchMovies de forma similar