/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { TMDBClient } from '../tmdb'; // Import the class we want to test
import { getEnvVariable } from '@/utils/envVariable';

// Mock the axios library
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the environment variable utility
jest.mock('@/utils/envVariable');
const mockedGetEnvVariable = getEnvVariable as jest.Mock;

describe('TMDBClient', () => {
  const apiKey = process.env.VITE_TMDB_API_KEY || 'test_api_key';
  let client: TMDBClient;

  beforeEach(() => {
    // Reset mocks before each test
    mockedAxios.create.mockClear();
    mockedGetEnvVariable.mockClear();
    
    // Set a default return value for the mocked env variable function
    mockedGetEnvVariable.mockReturnValue(apiKey);

    // Create a new instance of the client for each test
    client = new TMDBClient(apiKey);
  });

  // Test Suite for the Constructor
  describe('constructor', () => {
    it('should create an axios instance with the correct baseURL and params', () => {
      // Expect axios.create to have been called
      expect(mockedAxios.create).toHaveBeenCalledTimes(1);

      // Check the configuration passed to axios.create
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: apiKey,
          language: 'pt-BR',
        },
      });
    });
  });

  // Test Suite for getPopularMovies
  describe('getPopularMovies', () => {
    it('should fetch popular movies and return the data', async () => {
      const mockResponse = { data: { results: [{ id: 1, title: 'Test Movie' }], page: 1 } };
      const mockGet = jest.fn().mockResolvedValue(mockResponse);
      mockedAxios.create.mockReturnValue({ get: mockGet } as any);

      // Re-initialize client to use the mocked 'get'
      client = new TMDBClient(apiKey);

      const page = 1;
      const result = await client.getPopularMovies(page);

      // Check if the correct endpoint and params were used
      expect(mockGet).toHaveBeenCalledWith('/movie/popular', { params: { page } });
      
      // Check if the data is returned correctly
      expect(result).toEqual(mockResponse.data);
    });
  });

  // Test Suite for getMovieDetails
  describe('getMovieDetails', () => {
    it('should fetch movie details and return the data', async () => {
      const mockResponse = { data: { id: 1, title: 'Test Movie Details' } };
      const mockGet = jest.fn().mockResolvedValue(mockResponse);
      mockedAxios.create.mockReturnValue({ get: mockGet } as any);

      client = new TMDBClient(apiKey);

      const movieId = 1;
      const result = await client.getMovieDetails(movieId);

      expect(mockGet).toHaveBeenCalledWith(`/movie/${movieId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });

  // Test Suite for searchMovies
  describe('searchMovies', () => {
    it('should search for movies and return the data', async () => {
      const mockResponse = { data: { results: [{ id: 2, title: 'Found Movie' }], page: 1 } };
      const mockGet = jest.fn().mockResolvedValue(mockResponse);
      mockedAxios.create.mockReturnValue({ get: mockGet } as any);

      client = new TMDBClient(apiKey);

      const query = 'test query';
      const page = 1;
      const result = await client.searchMovies(query, page);

      expect(mockGet).toHaveBeenCalledWith('/search/movie', { params: { query, page } });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
