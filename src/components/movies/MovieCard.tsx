import React from 'react';
import { type Movie } from '@/types/Movie';
import { useFavorites } from '@/hooks/useFavorites'; // Hook de Favoritos
import { NavLink } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaTrash } from 'react-icons/fa'; // Ícones simples (Instale: npm install react-icons)

// Constante para a URL base da imagem do TMDB (tamanho w300)
// Requisito da Home: Poster -> https://image.tmdb.org/t/p/w300/{poster_path}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

interface MovieCardProps {
  movie: Movie;
  // Opcional: Flag para mudar o ícone para lixeira na página de Favoritos
  showRemoveButton?: boolean; 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showRemoveButton = false }) => {
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  
  // Verifica se o filme está nos favoritos
  const isCurrentlyFavorited = isFavorited(movie.id);

  // 1. Lógica do Botão de Ação (Adicionar/Remover)
  const handleActionClick = () => {
    if (showRemoveButton || isCurrentlyFavorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };
  
  // URL completa do poster
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path}` 
    : 'https://via.placeholder.com/300x450?text=Poster+Nao+Disponivel'; // Fallback sênior

  // Determina o ícone a ser exibido: Lixeira (FavoritosPage) ou Coração (Home/Search)
  const ActionIcon = showRemoveButton 
    ? FaTrash // Ícone de lixeira para a página de Favoritos
    : (isCurrentlyFavorited ? FaHeart : FaRegHeart); // Coração preenchido ou vazio

  // Estilo condicional para o coração/lixeira
  const iconColor = showRemoveButton ? 'text-red-500' : (isCurrentlyFavorited ? 'text-red-500' : 'text-white/70');

  // Formata a nota para uma casa decimal
  const formattedVote = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.03] transition-transform duration-300">
      
      {/* Link para a página de Detalhes */}
      <NavLink to={`/movie/${movie.id}`} title={movie.title} className="block relative">
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-auto object-cover"
        />
        
        {/* 2. Nota TMDB (Requisito) */}
        <div className="absolute top-2 left-2 bg-yellow-500 text-gray-900 font-bold p-1 rounded-md text-xs flex items-center space-x-0.5">
            <FaStar className="w-3 h-3" />
            <span>{formattedVote}</span>
        </div>
      </NavLink>

      {/* 3. Botão de Favoritar/Remover */}
      <button 
        onClick={handleActionClick}
        title={showRemoveButton ? 'Remover dos Favoritos' : 'Alternar Favorito'}
        className={`absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full transition-colors hover:bg-gray-700 ${iconColor}`}
      >
        <ActionIcon className="w-5 h-5" />
      </button>

      {/* 4. Título na base */}
      <div className="p-3">
        <h3 className="text-white text-lg font-semibold truncate">
          <NavLink to={`/movie/${movie.id}`} className="hover:text-blue-400 transition-colors">
            {movie.title}
          </NavLink>
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;