import React, { useState, useMemo, type ReactNode, type JSX } from 'react';
import MovieCard from '@/components/movies/MovieCard';
import type { Movie } from '@/types';

interface ListLayoutProps {
  children?: ReactNode;
  emptyState?: ReactNode;
  highlight?: string;
  movieList: Movie[]
  showRemoveButton?: boolean;
  sortable?: boolean;
  title: string | JSX.Element;
}

type SortType = 'title_asc' | 'title_desc' | 'rating_desc' | 'rating_asc';

const sortOptions = [
  { type: 'title_asc' as SortType, title: 'Título (A-Z)' },
  { type: 'title_desc' as SortType, title: 'Título (Z-A)' },
  { type: 'rating_desc' as SortType, title: 'Nota (Maior-Menor)' },
  { type: 'rating_asc' as SortType, title: 'Nota (Menor-Maior)' },
];

export const ListLayout: React.FC<ListLayoutProps> = ({
    children = <></>,
    emptyState = <></>,
    highlight = '',
    movieList,
    showRemoveButton,
    sortable,
    title
}) => {
  const [sortType, setSortType] = useState<SortType>('title_asc'); // Ordenação inicial

  // 1. Lógica de Ordenação (Memoizada para Performance Sênior)
  const sortedList = useMemo(() => {
    const list = [...movieList]; 

    if(sortable)
        list.sort((a, b) => {
        switch (sortType) {
            case 'title_asc':
              return a.title.localeCompare(b.title); // A-Z
            case 'title_desc':
              return b.title.localeCompare(a.title); // Z-A
            case 'rating_desc':
              return b.vote_average - a.vote_average; // Maior Nota
            case 'rating_asc':
              return a.vote_average - b.vote_average; // Menor Nota
            default:
              return 0;
        }
        });
    return list;
  }, [sortable, movieList, sortType]);

  // 2. Estado Vazio (Empty State)
  if (movieList.length === 0) {
    return emptyState;
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">{title}</h1>

        {/* 4. Filtros Simples (Requisito NTT DATA) */}
        {sortable && (
          <div className="flex items-center space-x-3">
              <label htmlFor="sort-select" className="text-gray-400 text-sm">Ordenar por:</label>
              <select
                  id="sort-select"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value as SortType)}
                  className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                  {sortOptions.map(option => (
                      <option key={option.type} value={option.type}>
                          {option.title}
                      </option>
                  ))}
              </select>
          </div>
        )}
      </div>

      {/* 5. Grid de Filmes (Reutilização do Card) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {sortedList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showRemoveButton={showRemoveButton} highlight={highlight} /> 
        ))}
      </div>

      {children}
    </div>
  );
};

export default ListLayout;