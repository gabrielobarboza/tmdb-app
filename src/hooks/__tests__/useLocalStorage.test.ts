// src/hooks/__tests__/useLocalStorage.test.ts

import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';
import { getStorageItem, setStorageItem } from '@/utils/storage';

// --- 1. Mock do Módulo de Storage ---
// Mock para as funções que interagem com o localStorage real.
jest.mock('@/utils/storage', () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));

// --- 2. Tipagem dos Mocks ---
// Fornece tipagem para os mocks para que o TypeScript não reclame.
const mockedGetStorageItem = getStorageItem as jest.Mock;
const mockedSetStorageItem = setStorageItem as jest.Mock;

// --- 3. Conjunto de Testes ---
describe('useLocalStorage Hook', () => {

  // Limpa os mocks antes de cada teste para garantir um ambiente limpo.
  beforeEach(() => {
    mockedGetStorageItem.mockClear();
    mockedSetStorageItem.mockClear();
  });

  it('deve inicializar com o valor do localStorage se ele existir', () => {
    const key = 'test_key';
    const storedValue = { data: 'stored value' };
    mockedGetStorageItem.mockReturnValue(storedValue); // Simula que há um valor no storage

    const { result } = renderHook(() => useLocalStorage(key, null));

    // O valor retornado deve ser o do storage
    expect(result.current[0]).toEqual(storedValue);
    // A função getStorageItem deve ter sido chamada com a chave correta
    expect(mockedGetStorageItem).toHaveBeenCalledWith(key);
  });

  it('deve inicializar com o valor inicial se o localStorage estiver vazio', () => {
    const key = 'test_key';
    const initialValue = { data: 'initial value' };
    mockedGetStorageItem.mockReturnValue(null); // Simula que não há nada no storage

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    // O valor retornado deve ser o valor inicial
    expect(result.current[0]).toEqual(initialValue);
    expect(mockedGetStorageItem).toHaveBeenCalledWith(key);
  });

  it('deve atualizar o estado e o localStorage ao chamar setValue com um novo valor', () => {
    const key = 'test_key';
    const initialValue = 'initial';
    const newValue = 'updated';

    mockedGetStorageItem.mockReturnValue(initialValue); // Começa com um valor inicial

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    // O estado inicial está correto
    expect(result.current[0]).toBe(initialValue);

    // --- Ação: Atualiza o valor ---
    act(() => {
      result.current[1](newValue);
    });

    // O estado do hook deve ser atualizado
    expect(result.current[0]).toBe(newValue);
    // A função para salvar no storage deve ter sido chamada com o novo valor
    expect(mockedSetStorageItem).toHaveBeenCalledWith(key, newValue);
  });

  it('deve atualizar o estado e o localStorage ao chamar setValue com uma função', () => {
    const key = 'test_key';
    const initialValue = 10;
    const updater = (val: number) => val + 5;

    mockedGetStorageItem.mockReturnValue(initialValue);

    const { result } = renderHook(() => useLocalStorage(key, 0));

    // Estado inicial
    expect(result.current[0]).toBe(initialValue);

    // --- Ação: Atualiza usando uma função ---
    act(() => {
      result.current[1](updater);
    });

    // O estado deve ser o resultado da função (10 + 5)
    expect(result.current[0]).toBe(15);
    // O storage deve ser atualizado com o novo valor
    expect(mockedSetStorageItem).toHaveBeenCalledWith(key, 15);
  });

  it('não deve quebrar se o localStorage falhar (simulado com erro)', () => {
    const key = 'test_key';
    const initialValue = 'initial';
    const newValue = 'new value';
    const error = new Error('Storage is full');

    // Mock para simular um erro ao salvar
    mockedSetStorageItem.mockImplementation(() => {
      throw error;
    });

    // Mock para o console.error para verificar se o erro é logado
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    // --- Ação: Tenta atualizar o valor ---
    act(() => {
      result.current[1](newValue);
    });

    // O estado do hook ainda deve ser atualizado
    expect(result.current[0]).toBe(newValue);
    // O erro deve ter sido logado no console
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao salvar no Local Storage:', error);

    // Restaura o console.error
    consoleErrorSpy.mockRestore();
  });
});
