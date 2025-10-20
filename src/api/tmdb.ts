import axios from 'axios';
import { type Movie, type PaginatedResponse } from '@/types/Movie'; // Você deve criar este tipo

// A chave da API é carregada do .env via VITE
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 1. Configuração básica do cliente Axios
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
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
