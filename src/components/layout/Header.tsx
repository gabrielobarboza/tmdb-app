import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  // Hook para navegação programática
  const navigate = useNavigate();
  
  // Estado para armazenar o termo de busca do input
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Lógica de Submissão da Busca Global (Sênior: usa e limpa o estado)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedTerm = searchTerm.trim();

    if (parsedTerm) {
      // Redireciona para a página de busca, passando o termo na query string
      navigate(`/search?q=${encodeURIComponent(parsedTerm)}`);
      
      // Limpa o input após a busca (Melhoria de UX)
      setSearchTerm(''); 
    }
  };

  // Funções para aplicar o estilo de link ativo
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    const modifierClass = isActive ? 'bg-yellow-500 text-gray-900' : 'hover:bg-gray-700 hover:text-yellow-300';
    return `px-4 py-2 rounded transition-colors ${modifierClass}`;
  };
  
  // URL da imagem de exemplo (ajuste conforme seu asset)
  const LOGO_SRC = "/src/assets/images/logo_moviedb.png"; // Adapte para o seu caminho real

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">

        {/* 2. Logo e Link para Home */}
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-yellow-500">
          {/* Você pode substituir o texto por uma imagem de logo */}
          <img src={LOGO_SRC} alt="MovieDB Logo" className="h-8 w-auto" />
          <span>MovieDB</span>
        </NavLink>

        {/* 3. Barra de Busca Global (Requisito NTT DATA) */}
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-lg mx-8">
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 bg-gray-700 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </form>

        {/* 4. Links de Navegação */}
        <nav className="flex space-x-3">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={getNavLinkClass}>
            Favoritos
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;