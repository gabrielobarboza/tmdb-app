import React, { useRef, useEffect, useMemo } from 'react';
import { usePopularMoviesInfinite } from '@/hooks/useTmdb';
import { type Movie } from '@/types/Movie';
import Loader from '@/components/common/Loader'; // Crie este componente Loader
import { ListLayout } from '@/components/layout';

export const Home: React.FC = () => {
  const { 
    data, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError 
  } = usePopularMoviesInfinite();

  // Ref para observar quando o usuário chega ao final da página
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 1. Implementação do Intersection Observer (Lógica Sênior para Infinite Scroll)
  useEffect(() => {
    // Se não houver mais páginas para buscar, não faz nada
    if (!hasNextPage) return; 

    const observer = new IntersectionObserver((entries) => {
      // Verifica se o elemento 'loadMoreRef' está visível e se não estamos já buscando
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage(); // Aciona a busca da próxima página
      }
    }, {
      rootMargin: '100px', // Aciona um pouco antes de chegar ao fim
    });

    const loadMoreElement = loadMoreRef.current;
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    // Limpeza: Desconecta o observer quando o componente desmonta
    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Extrai, achata e remove duplicatas de todos os filmes de todas as páginas
  const allMovies: Movie[] = useMemo(() => {
    const movies = data?.pages.flatMap(page => page.results) || [];
    // Usa um Map para garantir que cada filme seja único com base no seu ID
    return Array.from(new Map(movies.map(movie => [movie.id, movie])).values());
  }, [data]);

  if (isLoading) {
    // Exibe um loader no centro da tela
    return <div className="flex justify-center items-center h-full min-h-[50vh]"><Loader /></div>; 
  }

  if (isError) {
    // Exibe a mensagem de erro da API
    return <div className="text-center text-red-500 py-10">Erro ao carregar filmes: {error.message}</div>; 
  }

  return (
    <ListLayout movieList={allMovies} title="Filmes Populares">
      {/* 4. Ponto de Observação e Status do Carregamento */}
      <div ref={loadMoreRef} className="py-8">
        {isFetchingNextPage && <div className="flex justify-center"><Loader size="sm" /></div>}
        {!hasNextPage && allMovies.length > 0 && (
          <p className="text-center text-gray-400 mt-4">Fim do catálogo.</p>
        )}
      </div>
    </ListLayout>
  );
};

export default Home;