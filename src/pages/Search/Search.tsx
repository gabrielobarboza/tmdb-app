import React, { useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '@/components/common/Loader';
import EmptyState from '@/components/common/EmptyState';
import { useSearchMoviesInfinite } from '@/hooks/useTmdb';
import { Movie } from '@/types/Movie';
import { ListLayout } from '@/components/layout';

export const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const trimmedQuery = query.trim();

  const { 
    data, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError,
    isFetched,
  } = useSearchMoviesInfinite(trimmedQuery);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, {
      rootMargin: '100px',
    });

    const loadMoreElement = loadMoreRef.current;
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMovies: Movie[] = useMemo(() => {
    const movies = data?.pages.flatMap(page => page.results) || [];
    return Array.from(new Map(movies.map(movie => [movie.id, movie])).values());
  }, [data]);

  const totalResults: number = useMemo(() => {
    return data?.pages[0].total_results || 0
  }, [data]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-[70vh]"><Loader size="lg" /></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-10">Erro ao realizar a busca: {error.message}</div>;
  }

  const emptyState = (
    !trimmedQuery ? (
      <EmptyState 
        title="O que você está procurando?" 
        message="Use a barra de busca no topo para encontrar filmes." 
      />
    ) : (isFetched ? (
      <EmptyState 
        title={`Nenhum resultado encontrado para "${trimmedQuery}"`} 
        message="Tente refinar sua busca com palavras-chave diferentes."
        ctaText="Voltar para Filmes Populares"
        ctaLink="/"
      />
    ) : null)
  );
  
  return (
    <ListLayout
      title={(
        <>
          Resultados para: <span className="text-blue-400">"{trimmedQuery}"</span>
        </>
      )}
      movieList={allMovies}
      highlight={trimmedQuery}
      emptyState={emptyState}
      quantifyTitle={totalResults > 0 ? `${totalResults} resultado${totalResults > 1 ? 's' : ''}` : ''}
    >
       <div ref={loadMoreRef} className="py-8">
        {isFetchingNextPage && <div className="flex justify-center"><Loader size="sm" /></div>}
        {!hasNextPage && allMovies.length > 0 && (
          <p className="text-center text-gray-400 mt-4">Fim dos resultados.</p>
        )}
      </div>
    </ListLayout>
  )
};

export default Search;