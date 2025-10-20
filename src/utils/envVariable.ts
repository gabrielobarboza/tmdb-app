// src/utils/env.ts

/**
 * Módulo centralizado para acessar as variáveis de ambiente do Vite.
 * Isso isola a dependência do `import.meta.env` em um único lugar.
 */

export type EnvKeys = 'API_KEY' | 'IMAGE_BASE_URL' | 'IMAGE_BANNER_URL';

export const KEYS_MAP: Record<EnvKeys, string> = {
  API_KEY: 'VITE_TMDB_API_KEY',
  IMAGE_BASE_URL: 'VITE_TMDB_IMAGE_URL',
  IMAGE_BANNER_URL: 'VITE_TMDB_IMAGE_URL_BANNER',
};

export function getEnvVariable(key: string): string | undefined {
  return import.meta.env[KEYS_MAP[key as EnvKeys]];
}
