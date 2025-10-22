import axios, { AxiosError, AxiosInstance } from 'axios';
import { Movie, PaginatedResponse } from '@/types/Movie';
import { getEnvVariable } from '@/utils/envVariable';

const BASE_URL = 'https://api.themoviedb.org/3';

export class TMDBClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: BASE_URL,
      params: {
        api_key: apiKey,
        language: 'pt-BR',
      },
    });

    // Intercepta respostas de erro e formata a mensagem
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<{ status_message?: string }>) => {
        if (error.response?.data?.status_message) {
          // Se temos uma mensagem de erro da API do TMDB, usamos ela
          throw new Error(error.response.data.status_message);
        }
        // Caso contrário, usamos a mensagem padrão do axios
        throw error;
      }
    );
  }

  async getPopularMovies(page: number): Promise<PaginatedResponse<Movie>> {
    const response = await this.client.get<PaginatedResponse<Movie>>('/movie/popular', {
      params: { page },
    });
    return response.data;
  }

  async getMovieDetails(id: number): Promise<Movie> {
    if(id <= 0)
      throw new Error('ID de filme inválido.');

    const response = await this.client.get<Movie>(`/movie/${id}`);
    return response.data;
  }

  async searchMovies(query: string, page: number): Promise<PaginatedResponse<Movie>> {
    const trimmedQuery = query.trim();

    if(trimmedQuery === '') {
      throw new Error('Busca vazia.');
    }

    const response = await this.client.get<PaginatedResponse<Movie>>('/search/movie', {
      params: {
        query: trimmedQuery,
        page,
      },
    });
    
    return response.data;
  }
}

const apiKey = getEnvVariable('API_KEY') as string;
const tmdbClient = new TMDBClient(apiKey);

export default tmdbClient;