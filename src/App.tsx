import React from 'react';
import AppRouter from '@/router';
// import { FavoritesProvider } from '@/context/FavoritesContext'; 

const App: React.FC = () => {
  return (
    // 1. Provedor de Favoritos (Futuro)
    // <FavoritesProvider> 
        <AppRouter />
    // </FavoritesProvider>
  );
};

export default App;