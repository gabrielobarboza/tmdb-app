/**
 * Chave fixa que será usada para salvar/carregar os favoritos.
 */
export const FAVORITES_STORAGE_KEY = 'tmdb_favorites';

/**
 * Tenta carregar dados do Local Storage, parseando o JSON.
 * @param key A chave a ser buscada.
 * @returns O valor parseado ou null.
 */
export function getStorageItem<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    // Se o item existir, retorna o objeto parseado. Caso contrário, retorna null.
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    // Trata erros como JSON inválido ou acesso negado.
    console.error('Erro ao carregar do Local Storage:', error);
    return null;
  }
}

/**
 * Tenta salvar dados no Local Storage.
 * @param key A chave para salvar.
 * @param value O valor a ser salvo (será stringificado).
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Trata erros como Local Storage lotado (QuotaExceededError).
    console.error('Erro ao salvar no Local Storage:', error);
  }
}