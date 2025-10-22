import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '../MovieCard';
import { useFavorites } from '@/hooks/useFavorites';
import { Movie } from '@/types';

// Mock do hook useFavorites
jest.mock('@/hooks/useFavorites');

// Mock das variáveis de ambiente
jest.mock('@/utils/envVariable', () => ({
  getEnvVariable: jest.fn().mockReturnValue('https://image.tmdb.org/t/p/w500'),
}));

// Mock de um filme para testes
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  overview: 'Test overview',
  release_date: '2024-01-01',
  vote_average: 8.5,
  vote_count: 100,
  genres: [{ id: 1, name: 'Action' }],
  original_title: 'Original Test Movie',
  original_language: 'en',
};

const renderMovieCard = (props: React.ComponentProps<typeof MovieCard>) => {
  return render(
    <BrowserRouter>
      <MovieCard {...props} />
    </BrowserRouter>
  );
};

describe('MovieCard', () => {
  const mockUseFavorites = {
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorited: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavorites as jest.Mock).mockReturnValue(mockUseFavorites);
  });

  it('deve renderizar o título do filme', () => {
    renderMovieCard({ movie: mockMovie });
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it('deve renderizar a nota do filme', () => {
    renderMovieCard({ movie: mockMovie });
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('deve ter links para a página de detalhes', () => {
    renderMovieCard({ movie: mockMovie });
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`);
    });
  });

  it('deve usar uma imagem de placeholder quando poster_path é null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    renderMovieCard({ movie: movieWithoutPoster });
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://placehold.co/300x450?text=Poster+Nao+Disponivel');
  });

  it('deve mostrar o ícone de favorito vazio quando não está favoritado', () => {
    mockUseFavorites.isFavorited.mockReturnValue(false);
    renderMovieCard({ movie: mockMovie });

    const favoriteButton = screen.getByTitle('Alternar Favorito');
    expect(favoriteButton).toBeInTheDocument();
    // Verificamos se o ícone de coração vazio está presente
    expect(favoriteButton.firstChild).toHaveClass('w-5', 'h-5');
  });

  it('deve mostrar o ícone de favorito preenchido quando está favoritado', () => {
    mockUseFavorites.isFavorited.mockReturnValue(true);
    renderMovieCard({ movie: mockMovie });

    const favoriteButton = screen.getByTitle('Alternar Favorito');
    expect(favoriteButton).toBeInTheDocument();
    // Verificamos se o ícone de coração preenchido está presente
    expect(favoriteButton.firstChild).toHaveClass('w-5', 'h-5');
  });

  it('deve chamar addFavorite ao clicar no botão quando não está favoritado', () => {
    mockUseFavorites.isFavorited.mockReturnValue(false);
    renderMovieCard({ movie: mockMovie });

    const favoriteButton = screen.getByTitle('Alternar Favorito');
    fireEvent.click(favoriteButton);

    expect(mockUseFavorites.addFavorite).toHaveBeenCalledWith(mockMovie);
    expect(mockUseFavorites.removeFavorite).not.toHaveBeenCalled();
  });

  it('deve chamar removeFavorite ao clicar no botão quando está favoritado', () => {
    mockUseFavorites.isFavorited.mockReturnValue(true);
    renderMovieCard({ movie: mockMovie });

    const favoriteButton = screen.getByTitle('Alternar Favorito');
    fireEvent.click(favoriteButton);

    expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith(mockMovie.id);
    expect(mockUseFavorites.addFavorite).not.toHaveBeenCalled();
  });

  it('deve destacar o texto quando a prop highlight é fornecida', () => {
    const highlight = 'Test';
    renderMovieCard({ movie: mockMovie, highlight });

    const highlightedText = screen.getByText('Test');
    expect(highlightedText).toHaveClass('bg-yellow-500', 'text-gray-900', 'font-bold');
  });

  it('deve mostrar botão de remover quando showRemoveButton é true', () => {
    renderMovieCard({ movie: mockMovie, showRemoveButton: true });

    const removeButton = screen.getByTitle('Remover dos Favoritos');
    expect(removeButton).toBeInTheDocument();
  });

  it('deve remover o filme ao clicar no botão de remover', () => {
    renderMovieCard({ movie: mockMovie, showRemoveButton: true });

    const removeButton = screen.getByTitle('Remover dos Favoritos');
    fireEvent.click(removeButton);

    expect(mockUseFavorites.removeFavorite).toHaveBeenCalledWith(mockMovie.id);
  });
});