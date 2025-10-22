import React, { ReactNode } from 'react';
import Header from '@/components/layout/Header'; // Usando Alias!

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-primary text-secondary">
      {/* O Header Fixo com a Barra de Busca Global (Requisito 1) */}
      <Header /> 
      
      {/* O main deve ocupar o restante da altura e conter o conteúdo da rota */}
      <main className="flex-grow container mx-auto p-4 pt-20"> 
        {/* pt-20 para compensar o Header fixo */}
        {children}
      </main>
      
      {/* Opcional: Adicionar Footer aqui */}
    </div>
  );
};

export default AppLayout;