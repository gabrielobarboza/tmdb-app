import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones para o menu hambúrguer
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import LOGO_SRC from '@/assets/images/logo_moviedb.png';

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
    const baseClasses = 'px-4 py-2 rounded transition-colors block w-full text-left  font-semibold'; // Ajustado para menu móvel
    const activeClasses = 'bg-yellow-500 text-gray-900';
    const inactiveClasses = 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-yellow-500';
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-gray-100 dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3">

        {/* Logo e Link para Home */}
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-yellow-500" onClick={() => setIsMenuOpen(false)}>
          <img src={LOGO_SRC} alt="The Movie DB Logo" className="h-8 w-auto" />
          <span className="hidden sm:inline">The Movie DB</span>
        </NavLink>

        {/* Barra de Busca (Desktop) */}
        <div className="sm:flex flex-grow max-w-lg mx-8">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
            />
          </form>
        </div>

        {/* Links de Navegação (Desktop) */}
        <div className="flex gap-4">
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
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-grey-800 dark:text-grey-200 text-2xl py-2">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <ThemeSwitcher />
        </div>
      </div>

      {/* Menu Móvel (Dropdown) */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
          <nav className="flex flex-col p-4 pt-2 space-y-2">
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