import { useState, useMemo } from 'react';
import { Movie } from '@/types';
import { SortType } from '@/config/sortOptions';

export const useMovieSort = (movies: Movie[]) => {
  const [sortType, setSortType] = useState<SortType>('title_asc');

  const sortedMovies = useMemo(() => {
    const list = [...movies];
    list.sort((a, b) => {
      switch (sortType) {
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'rating_desc':
          return b.vote_average - a.vote_average;
        case 'rating_asc':
          return a.vote_average - b.vote_average;
        default:
          return 0;
      }
    });
    return list;
  }, [movies, sortType]);

  return { sortedMovies, sortType, setSortType };
};
