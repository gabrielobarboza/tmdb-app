// src/utils/__tests__/storage.test.ts

import { getStorageItem, setStorageItem, FAVORITES_STORAGE_KEY } from '../storage';

// --- 1. Mock do Local Storage ---
// Vamos simular o comportamento do Local Storage em memória para os testes.
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    }
  };
})();

// Substitui o `window.localStorage` real pelo nosso mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock do console.error para verificar se ele é chamado
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const MOCK_DATA = [{ id: 101, title: 'Filme A' }, { id: 102, title: 'Filme B' }];

// --- 2. Conjunto de Testes ---
describe('Funções de Storage', () => {

  // Limpa o mock do storage e do console antes de cada teste
  beforeEach(() => {
    localStorageMock.clear();
    consoleErrorSpy.mockClear();
  });

  // --- Testes para setStorageItem ---
  describe('setStorageItem', () => {
    it('deve salvar um objeto no Local Storage como uma string JSON', () => {
      const testData = MOCK_DATA[0];
      setStorageItem(FAVORITES_STORAGE_KEY, testData);

      const storedValue = localStorageMock.getItem(FAVORITES_STORAGE_KEY);
      expect(storedValue).toBe(JSON.stringify(testData));
    });

    it('deve salvar um array no Local Storage', () => {
      const testArray = MOCK_DATA;
      setStorageItem('my_array', testArray);

      const storedValue = localStorageMock.getItem('my_array');
      expect(storedValue).toBe(JSON.stringify(testArray));
    });

    it('deve chamar console.error se o Local Storage estiver cheio', () => {
      // Força um erro ao tentar salvar
      jest.spyOn(window.localStorage, 'setItem').mockImplementationOnce(() => {
        throw new Error('QuotaExceededError');
      });

      setStorageItem('qualquer_chave', { data: 'grande' });
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao salvar no Local Storage:', expect.any(Error));
    });
  });

  // --- Testes para getStorageItem ---
  describe('getStorageItem', () => {
    it('deve retornar um objeto parseado do Local Storage', () => {
      const testData = MOCK_DATA[1];
      localStorageMock.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(testData));

      const retrievedData = getStorageItem<{ id: number; name: string }>(FAVORITES_STORAGE_KEY);
      expect(retrievedData).toEqual(testData);
    });

    it('deve retornar null se a chave não existir', () => {
      const retrievedData = getStorageItem('chave_inexistente');
      expect(retrievedData).toBeNull();
    });

    it('deve retornar null e chamar console.error para JSON inválido', () => {
      // Salva uma string que não é um JSON válido
      localStorageMock.setItem('json_invalido', 'isto-nao-e-json');

      const retrievedData = getStorageItem('json_invalido');
      expect(retrievedData).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar do Local Storage:', expect.any(Error));
    });

    it('deve retornar null se o Local Storage não estiver disponível', () => {
        // Simula o localStorage lançando um erro no getItem
        jest.spyOn(window.localStorage, 'getItem').mockImplementationOnce(() => {
            throw new Error('SecurityError');
        });

        const retrievedData = getStorageItem('qualquer_chave');
        expect(retrievedData).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao carregar do Local Storage:', expect.any(Error));
    });
  });
});
