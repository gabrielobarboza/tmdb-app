// src/types/Movie.ts

// 1. Interface da Entidade Principal (O Filme)
export interface Movie {
  // Propriedades essenciais que usaremos nas listagens e detalhes
  id: number;
  title: string;
  poster_path: string | null; // O path pode ser nulo
  backdrop_path: string | null; // O path pode ser nulo

  // Propriedades para a página de Detalhes
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  
  // Propriedades da TMDB que você pode incluir se quiser
  original_title: string;
  original_language: string;
}

// 2. Interface da Resposta Paginada da API (Usada no React Query)
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
