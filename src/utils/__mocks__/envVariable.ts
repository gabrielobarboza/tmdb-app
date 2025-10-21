export const getEnvVariable = jest.fn((key: string) => {
  switch (key) {
    case 'API_KEY':
      return process.env.VITE_TMDB_API_KEY;
    case 'IMAGE_BASE_URL':
      return process.env.VITE_TMDB_IMAGE_URL;
    case 'IMAGE_BANNER_URL':
      return process.env.VITE_TMDB_IMAGE_URL_BANNER;
    case 'TMDB_BASE_URL':
      return process.env.VITE_TMDB_BASE_URL;
    default:
      return 'mock_value';
  }
});