import { useQuery, useInfiniteQuery, type UseQueryResult, type UseInfiniteQueryResult, type InfiniteData } from '@tanstack/react-query';
import { type Movie, type PaginatedResponse } from '@/types/Movie';
import { getPopularMovies, getMovieDetails, searchMovies } from '@/api/tmdb';

// Chave única para o cache do React Query
const MOVIE_KEYS = {
  popular: (page: number) => ['movies', 'popular', page],
  popular_infinite: ['movies', 'popular'], // A chave agora é fixa, as páginas são internas
  details: (id: number) => ['movie', id], // Chave dinâmica para cada ID
  search: (query: string) => ['movies', 'search', query], // Chave dinâmica para o cache
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

/**
 * Hook customizado para buscar filmes populares com Infinite Scroll.
 */
export const usePopularMoviesInfinite = (): UseInfiniteQueryResult<InfiniteData<PaginatedResponse<Movie>>, Error> => {
  return useInfiniteQuery({
    queryKey: MOVIE_KEYS.popular_infinite,
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam as number),
    initialPageParam: 1,
    // 1. Lógica do Infinite Scroll (getNextPageParam)
    getNextPageParam: (lastPage) => {
      // Se a última página não for a última total, retorna a próxima página.
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined; // Não há mais páginas
    },

    // 2. Opções de Caching
    staleTime: 1000 * 60 * 5, // 5 minutos para evitar requisições repetidas
  });
};

/**
 * Hook customizado para buscar os detalhes de um filme específico.
 * @param id O ID do filme a ser buscado.
 */
export const useMovieDetails = (id: number): UseQueryResult<Movie, Error> => {
  return useQuery({
    queryKey: MOVIE_KEYS.details(id),
    queryFn: () => getMovieDetails(id),
    enabled: !!id, // Só executa a busca se o ID for válido
    staleTime: 1000 * 60 * 60, // Detalhes do filme podem ficar em cache por 1 hora
  });
};

/**
 * Hook customizado para buscar filmes com base em uma query e Infinite Scroll.
 * @param query O termo de busca.
 */
export const useSearchMoviesInfinite = (query: string): UseInfiniteQueryResult<InfiniteData<PaginatedResponse<Movie>>, Error> => {
  return useInfiniteQuery({
    queryKey: MOVIE_KEYS.search(query),
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam as number),
    initialPageParam: 1,
    // Só executa a busca se a query for válida (enabled: Sênior)
    enabled: !!query.trim(), 

    getNextPageParam: (lastPage) => {
      // Mesma lógica: retorna a próxima página se houver mais
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
};
