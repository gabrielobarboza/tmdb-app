import { useState } from 'react';
import { getStorageItem, setStorageItem } from '@/utils/storage'; // Usando Alias!

/**
 * Custom Hook para gerenciar estado persistente no Local Storage.
 * * @param key A chave do Local Storage (ex: 'tmdb_favorites').
 * @param initialValue O valor inicial se nada for encontrado no Local Storage.
 * @returns [storedValue, setValue] - O valor e a função de atualização de estado.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  
  // 1. Inicializa o estado lendo do Local Storage na montagem inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Executa apenas na primeira renderização para ler o valor inicial.
    const item = getStorageItem<T>(key);
    return item !== null ? item : initialValue;
  });

  // 2. Cria a função de atualização que também manipula o Local Storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Lida com o formato de função de atualização do useState padrão
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Atualiza o estado do React
      setStoredValue(valueToStore);
      
      // Salva a nova versão no Local Storage (o efeito colateral)
      setStorageItem(key, valueToStore);

    } catch (error) {
      console.error('Erro ao salvar no Local Storage:', error);
    }
  };

  // O "as const" infere corretamente o tipo da tupla [T, (value: T) => void]
  return [storedValue, setValue] as const;
}

export default useLocalStorage;