import { renderHook } from '@testing-library/react';
import { useFavorites } from '../useFavorites';
import { FavoritesProvider } from '@/context/FavoritesContext';
import React from 'react';

describe('useFavorites', () => {
  it('retorna o contexto quando usado dentro de um FavoritesProvider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    );
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current).toBeDefined();
  });
});