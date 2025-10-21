import axios, { AxiosInstance } from 'axios';
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
  }

  async getPopularMovies(page: number): Promise<PaginatedResponse<Movie>> {
    const response = await this.client.get<PaginatedResponse<Movie>>('/movie/popular', {
      params: { page },
    });
    return response.data;
  }

  async getMovieDetails(id: number): Promise<Movie> {
    const response = await this.client.get<Movie>(`/movie/${id}`);
    return response.data;
  }

  async searchMovies(query: string, page: number): Promise<PaginatedResponse<Movie>> {
    const response = await this.client.get<PaginatedResponse<Movie>>('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  }
}

const apiKey = getEnvVariable('API_KEY') as string;
const tmdbClient = new TMDBClient(apiKey);

export default tmdbClient;