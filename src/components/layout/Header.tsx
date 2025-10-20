import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para o menu hambúrguer

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu móvel

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTerm = searchTerm.trim();
    if (parsedTerm) {
      navigate(`/search?q=${encodeURIComponent(parsedTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false); // Fecha o menu ao buscar
    }
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClasses = 'px-4 py-2 rounded transition-colors block w-full text-left'; // Ajustado para menu móvel
    const activeClasses = 'bg-yellow-500 text-gray-900';
    const inactiveClasses = 'hover:bg-gray-700 hover:text-yellow-300';
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };
  
  const LOGO_SRC = "/src/assets/images/logo_moviedb.png";

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">

        {/* Logo e Link para Home */}
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-yellow-500" onClick={() => setIsMenuOpen(false)}>
          <img src={LOGO_SRC} alt="MovieDB Logo" className="h-8 w-auto" />
          <span className="hidden sm:inline">MovieDB</span>
        </NavLink>

        {/* Barra de Busca (Desktop) */}
        <div className="sm:flex flex-grow max-w-lg mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full">
          <input
              type="text"
              placeholder="Buscar filmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 bg-gray-700 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
          </form>
        </div>

        {/* Links de Navegação (Desktop) */}
        <nav className="hidden sm:flex space-x-3">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/favorites" className={getNavLinkClass}>
            Favoritos
          </NavLink>
        </nav>

        {/* Botão do Menu Hambúrguer (Mobile) */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Móvel (Dropdown) */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800 shadow-lg">
          <nav className="flex flex-col p-4 pt-0 space-y-2">
            <NavLink to="/" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/favorites" className={getNavLinkClass} onClick={() => setIsMenuOpen(false)}>
              Favoritos
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;