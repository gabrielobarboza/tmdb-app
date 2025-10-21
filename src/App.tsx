import React from 'react';
import AppRouter from '@/router';
import { FavoritesProvider } from '@/context/FavoritesContext'; 

const App: React.FC = () => {
  return (
    // Envolve o AppRouter com o Provedor de Favoritos
    <FavoritesProvider> 
      <AppRouter />
    </FavoritesProvider>
  );
};

export default App;