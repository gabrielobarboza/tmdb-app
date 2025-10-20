import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '@/hooks/useTmdb';
import { useFavorites } from '@/hooks/useFavorites';
import Loader from '@/components/common/Loader';
import { FaHeart, FaRegHeart, FaStar, FaCalendarAlt } from 'react-icons/fa';

// URL base para a imagem de backdrop (tamanho original)
// Requisito: https://image.tmdb.org/t/p/original/{backdrop_path}
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL_BANNER;

export const Details: React.FC = () => {
  // Pega o ID da URL e converte para número
  const { id } = useParams<{ id: string }>();
  const movieId = parseInt(id || '0', 10);

  // Busca os Detalhes com React Query
  const { data: movie, isLoading, isError, error } = useMovieDetails(movieId);

  // Lógica de Favoritos
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const isCurrentlyFavorited = movie ? isFavorited(movie.id) : false;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Lógica do botão de favoritar/remover
  const handleFavoriteToggle = () => {
    if (!movie) return;
    if (isCurrentlyFavorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Tratamento de Estados (Loading, Error e Not Found)
  if (isLoading) {
    return <div className="flex justify-center items-center h-[70vh]"><Loader size="lg" /></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-10">Erro ao carregar detalhes: {error.message}</div>;
  }
  
  // Se o filme não foi encontrado (ex: movie é undefined/null)
  if (!movie) {
    return <div className="text-center text-white py-10">Filme não encontrado.</div>;
  }

  // URL completa do backdrop, com fallback
  const backdropUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}` 
    : 'https://placehold.co/1280x720?text=Imagem+Nao+Disponivel';

  // Formatação de data
  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) 
    : 'N/A';

  // Texto e Estilo do Botão
  const buttonText = isCurrentlyFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';
  const buttonClass = isCurrentlyFavorited ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700';
  const ButtonIcon = isCurrentlyFavorited ? FaHeart : FaRegHeart;

  return (
    <div className="py-8 text-white">
      <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6 md:p-8">
        
        {/* Layout Grid/Flex para o bloco principal */}
        <div className="md:flex md:space-x-8">

          {/* Imagem Backdrop à esquerda */}
          <div className="w-full md:w-1/2 flex-shrink-0 mb-6 md:mb-0">
            <div className="relative w-full bg-gray-700 rounded-lg" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
              {!isImageLoaded && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Loader size="md" />
                </div>
              )}
              <img 
                src={backdropUrl} 
                alt={`Backdrop de ${movie.title}`} 
                className={`absolute top-0 left-0 w-full h-full rounded-lg shadow-xl object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          </div>

          {/* Conteúdo à direita */}
          <div className="flex-grow">
            <h1 className="text-4xl font-extrabold mb-3">{movie.title}</h1>

            {/* Gêneros (Badges) */}
            <div className="flex flex-wrap space-x-2 mb-4">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Data e Nota */}
            <p className="text-gray-400 text-sm mb-2 flex items-center space-x-2">
              <FaCalendarAlt className="w-4 h-4" />
              <span>Data de lançamento:</span>
              <span className="font-semibold">{releaseDate}</span>
            </p>
            <p className="text-gray-400 text-sm mb-6 flex items-center space-x-2">
              <span>Nota TMDB:</span>
              <span className="bg-yellow-500 text-gray-900 font-bold px-2 py-0.5 rounded-md text-sm flex items-center space-x-1">
                <FaStar className="w-3 h-3" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </span>
            </p>

            {/* Sinopse */}
            <h2 className="text-2xl font-bold mb-3">Sinopse</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {movie.overview || "Sinopse não disponível."}
            </p>

            {/* Botão de Favoritar */}
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center space-x-2 px-6 py-3 font-bold rounded-lg transition-all shadow-lg ${buttonClass}`}
            >
              <ButtonIcon className="w-5 h-5" />
              <span>{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;