/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { TMDBClient } from '../tmdb';
import { Movie } from '@/types';

// Mock functions
jest.mock('axios', () => {
  const mockGet = jest.fn();
  const mockUse = jest.fn();

  return {
    create: jest.fn(() => ({
      get: mockGet,
      interceptors: {
        response: {
          use: mockUse
        }
      }
    }))
  };
});

jest.mock('@/utils/envVariable', () => ({
  getEnvVariable: jest.fn().mockReturnValue('test_api_key')
}));

// Helpers para os mocks
let mockGet: jest.Mock;
let mockUse: jest.Mock;

beforeAll(() => {
  const axiosMock = jest.requireMock('axios');
  const instance = axiosMock.create();
  mockGet = instance.get;
  mockUse = instance.interceptors.response.use;
});

// Função auxiliar para criar respostas do axios
const createAxiosResponse = <T>(data: T) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {} as any
});

// Mock de dados consistentes para testes
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  overview: 'Test overview',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genres: [{ id: 1, name: 'Action' }],
  original_title: 'Original Test Movie',
  original_language: 'en',
};

const mockPaginatedResponse = {
  page: 1,
  results: [mockMovie],
  total_pages: 10,
  total_results: 100,
};

describe('TMDBClient', () => {
  const apiKey = 'test_api_key';
  let client: TMDBClient;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock padrão para respostas bem sucedidas
    mockGet.mockImplementation((url: string) => {
      if (url.includes('/movie/popular')) {
        return Promise.resolve(createAxiosResponse(mockPaginatedResponse));
      }
      if (url.includes('/movie/')) {
        return Promise.resolve(createAxiosResponse(mockMovie));
      }
      if (url.includes('/search/movie')) {
        return Promise.resolve(createAxiosResponse(mockPaginatedResponse));
      }
      return Promise.reject(new Error('Endpoint não encontrado'));
    });
    
    // Cria uma nova instância do cliente
    client = new TMDBClient(apiKey);
  });

  describe('constructor', () => {
    it('deve criar uma instância do axios com as configurações corretas', () => {

      expect(jest.requireMock('axios').create).toHaveBeenCalledWith({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: apiKey,
          language: 'pt-BR',
        },
      });
    });

    it('deve configurar o interceptor de resposta', () => {
      expect(mockUse).toHaveBeenCalled();
    });
  });

  describe('getPopularMovies', () => {
    it('deve buscar filmes populares com sucesso', async () => {
      mockGet.mockResolvedValueOnce(createAxiosResponse(mockPaginatedResponse));

      const result = await client.getPopularMovies(1);

      expect(mockGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 1 } });
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('deve lidar com erros na busca de filmes populares', async () => {
      const error = {
        name: 'AxiosError',
        message: 'Service unavailable',
        code: '500',
        isAxiosError: true,
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { status_message: 'Service unavailable' },
          headers: {},
          config: {} as any
        }
      } as AxiosError;
      mockGet.mockRejectedValueOnce(error);

      const transformedError = await client.getPopularMovies(1).catch(e => e);
      expect(transformedError.message).toBe('Service unavailable');
    });

    it('deve validar o número da página', async () => {
      mockGet.mockResolvedValueOnce(createAxiosResponse(mockPaginatedResponse));
      await client.getPopularMovies(1);
      expect(mockGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 1 } });

      mockGet.mockResolvedValueOnce(createAxiosResponse(mockPaginatedResponse));
      await client.getPopularMovies(2);
      expect(mockGet).toHaveBeenCalledWith('/movie/popular', { params: { page: 2 } });
    });
  });

  describe('getMovieDetails', () => {
    it('deve buscar detalhes do filme com sucesso', async () => {
      mockGet.mockResolvedValueOnce(createAxiosResponse(mockMovie));

      const result = await client.getMovieDetails(1);

      expect(mockGet).toHaveBeenCalledWith('/movie/1');
      expect(result).toEqual(mockMovie);
    });

    it('deve lidar com erros na busca de detalhes', async () => {
      const error = {
        name: 'AxiosError',
        message: 'Movie not found',
        code: '404',
        isAxiosError: true,
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { status_message: 'Movie not found' },
          headers: {},
          config: {} as any
        }
      } as AxiosError;
      mockGet.mockRejectedValueOnce(error);

      const transformedError = await client.getMovieDetails(999).catch(e => e);
      expect(transformedError.message).toBe('Movie not found');
    });

    it('deve rejeitar IDs de filme inválidos', async () => {
      await expect(client.getMovieDetails(-1)).rejects.toThrow();
      await expect(client.getMovieDetails(0)).rejects.toThrow();
      expect(mockGet).not.toHaveBeenCalled();
    });
  });

  describe('searchMovies', () => {
    it('deve buscar filmes por query com sucesso', async () => {
      const result = await client.searchMovies('test', 1);

      expect(mockGet).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'test', page: 1 },
      });
      expect(result).toEqual(mockPaginatedResponse);
    });

    it('deve lidar com erros na busca', async () => {
      const error = {
        name: 'AxiosError',
        message: 'Search failed',
        code: '503',
        isAxiosError: true,
        response: {
          status: 503,
          statusText: 'Service Unavailable',
          data: { status_message: 'Search failed' },
          headers: {},
          config: {} as any
        }
      } as AxiosError;
      mockGet.mockRejectedValueOnce(error);

      const transformedError = await client.searchMovies('test', 1).catch(e => e);
      expect(transformedError.message).toBe('Search failed');
    });

    it('deve rejeitar queries vazias', async () => {
      await expect(client.searchMovies('', 1)).rejects.toThrow();
      await expect(client.searchMovies('   ', 1)).rejects.toThrow();
      expect(mockGet).not.toHaveBeenCalled();
    });

    it('deve formatar a query corretamente', async () => {
      mockGet.mockResolvedValueOnce(createAxiosResponse(mockPaginatedResponse));

      await client.searchMovies('  test query  ', 1);

      expect(mockGet).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'test query', page: 1 },
      });
    });

    it('deve tratar caracteres especiais na query', async () => {
      mockGet.mockResolvedValueOnce(createAxiosResponse(mockPaginatedResponse));

      await client.searchMovies('test & query', 1);

      expect(mockGet).toHaveBeenCalledWith('/search/movie', {
        params: { query: 'test & query', page: 1 },
      });
    });
  });
});
