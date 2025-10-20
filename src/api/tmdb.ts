import axios from 'axios';
import { Movie, PaginatedResponse } from '@/types/Movie'; // Você deve criar este tipo

import { getEnvVariable } from '@/utils/envVariable';
const BASE_URL = 'https://api.themoviedb.org/3';

// 1. Configuração básica do cliente Axios
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: getEnvVariable('API_KEY'),
    language: 'pt-BR', // Incluindo um parâmetro global útil
  },
});

/**
 * Função pura para buscar filmes populares (Query Function)
 * @returns {Promise<Movie[]>} Uma lista de filmes.
 */
export const getPopularMovies = async (page: number): Promise<PaginatedResponse<Movie>> => {
  const response = await tmdbClient.get<PaginatedResponse<Movie>>(`/movie/popular`, {
    params: { page },
  });
  return response.data;
};

/**
 * Função pura para buscar os detalhes de um filme específico pelo ID.
 * @param id O ID do filme (path: /movie/{movie_id}).
 * @returns Um objeto Movie com todos os detalhes.
 */
export const getMovieDetails = async (id: number): Promise<Movie> => {
  // O Axios fará a requisição para BASE_URL/movie/{id}
  const response = await tmdbClient.get<Movie>(`/movie/${id}`);
  
  // Retorna o objeto de dados (Movie)
  return response.data;
};

/**
 * Função pura para buscar filmes com base em um termo de busca.
 * @param query O termo de busca.
 * @param page A página de resultados.
 * @returns Resposta paginada de filmes.
 */
export const searchMovies = async (query: string, page: number): Promise<PaginatedResponse<Movie>> => {
  // O Axios fará a requisição para BASE_URL/search/movie
  const response = await tmdbClient.get<PaginatedResponse<Movie>>(`/search/movie`, {
    params: { 
      query: query, // Passa o termo de busca
      page: page,
    },
  });
  return response.data;
};
