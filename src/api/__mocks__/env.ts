// src/utils/__mocks__/env.ts

/**
 * Mock do módulo de ambiente para ser usado nos testes do Jest.
 * Fornece valores falsos e consistentes para as variáveis de ambiente.
 */

// KEY exclusiva para testes, diferente da KEY utilizada na publicação
export const API_KEY = '31732ef0e123bc1661bd2e84b8a1469f';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
export const IMAGE_BANNER_URL = 'https://image.tmdb.org/t/p/original';
export const TMDB_BASE_URL='https://api.themoviedb.org/3'