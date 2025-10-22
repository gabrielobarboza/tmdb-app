import React, { ReactNode, JSX } from 'react';
import MovieCard from '@/components/common/MovieCard';
import { Movie } from '@/types';

interface ListLayoutProps {
  children?: ReactNode; // Para o observador de scroll infinito
  emptyState?: ReactNode;
  movieList: Movie[];
  showRemoveButton?: boolean;
  title: string | JSX.Element;
  highlight?: string;
  headerContent?: ReactNode; // Novo slot para conteúdo como o SortBy
  quantifyTitle?: string; // Novo prop para título de quantificação
}

export const ListLayout: React.FC<ListLayoutProps> = ({
    children = <></>,
    emptyState,
    movieList,
    showRemoveButton,
    title,
    highlight,
    headerContent,
    quantifyTitle
}) => {

  // O estado de vazio agora é tratado pelo componente pai
  if (movieList.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  const titleSpacing = quantifyTitle ? 'mb-2' : 'mb-6';

  return (
    <div className="py-8">
      <div className={`flex justify-between items-center ${titleSpacing}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {headerContent}
      </div>
      {quantifyTitle && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">{quantifyTitle}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movieList.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            showRemoveButton={showRemoveButton}
            highlight={highlight}
          /> 
        ))}
      </div>

      {children}
    </div>
  );
};