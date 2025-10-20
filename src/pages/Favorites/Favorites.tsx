import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import EmptyState from '@/components/common/EmptyState';
import { ListLayout } from '@/components/layout';
import { useMovieSort } from '@/hooks/useMovieSort';
import SortBy from '@/components/common/SortBy';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { sortedMovies, sortType, setSortType } = useMovieSort(favorites);

  const emptyState = (
    <EmptyState
      title="Sua Lista de Favoritos Está Vazia"
      message="Comece a adicionar filmes à sua lista de favoritos para vê-los aqui."
      ctaText="Explorar Filmes Populares"
      ctaLink="/"
    />
  );

  return (
    <ListLayout
      title="Meus Filmes Favoritos"
      movieList={sortedMovies}
      showRemoveButton={true}
      emptyState={emptyState}
      headerContent={<SortBy sortType={sortType} onSortChange={setSortType} />}
    />
  );
};