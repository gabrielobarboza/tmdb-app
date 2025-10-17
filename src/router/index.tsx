import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as Páginas (usando Alias)
import AppLayout from '@/components/layout/AppLayout';
import { Favorites } from '@/pages/Favorites';
import { Home } from '@/pages/Home';
import { Search } from '@/pages/Search';
import { Details as MovieDetails } from '@/pages/Details';

// Componente Wrapper para as Rotas (Padrão Sênior)
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      {/* O AppLayout envolve as rotas que compartilham o mesmo Header */}
      <AppLayout>
        <Routes>
          {/* 1. Home (Listagem de populares) */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Detalhes do Filme (/movie/:id) */}
          <Route path="/movie/:id" element={<MovieDetails />} />
          
          {/* 3. Favoritos (/favorites) */}
          <Route path="/favorites" element={<Favorites />} />
          
          {/* 4. Página de Busca (/search?q=termo) */}
          {/* A busca é lida via URLSearchParams no componente Search.tsx */}
          <Route path="/search" element={<Search />} /> 
          
          {/* Opcional: Rota de 404 para URLs não encontradas */}
          <Route path="*" element={<h1>404 | Página Não Encontrada</h1>} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRouter;