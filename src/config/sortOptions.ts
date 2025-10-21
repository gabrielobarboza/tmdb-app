export type SortType = 'title_asc' | 'title_desc' | 'rating_desc' | 'rating_asc';

export const sortOptions = [
  { type: 'title_asc' as SortType, title: 'Título (A-Z)' },
  { type: 'title_desc' as SortType, title: 'Título (Z-A)' },
  { type: 'rating_desc' as SortType, title: 'Nota (Maior-Menor)' },
  { type: 'rating_asc' as SortType, title: 'Nota (Menor-Maior)' },
];
