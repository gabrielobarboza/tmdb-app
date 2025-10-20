import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import EmptyState from '@/components/common/EmptyState';
import { ListLayout } from '@/components/layout';

// Definição dos tipos de ordenaçã
export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <ListLayout
      title="Meus Filmes Favoritos"
      movieList={favorites}
      sortable
      showRemoveButton
      emptyState={(
        <EmptyState
          title="Sua Lista de Favoritos Está Vazia"
          message="Comece a adicionar filmes à sua lista de favoritos para vê-los aqui."
          ctaText="Explorar Filmes Populares"
          ctaLink="/"
        />
      )}
    />
  );
};

export default Favorites;