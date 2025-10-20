import React from 'react';

// Define os tamanhos que o loader pode receber
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Ex: 'text-white', 'text-blue-500'
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'text-blue-500' }) => {
  // 1. Definição do Tamanho com base na prop 'size'
  const sizeClasses = {
    sm: 'w-6 h-6 border-2', // Usado no Infinite Scroll
    md: 'w-10 h-10 border-4', // Padrão
    lg: 'w-16 h-16 border-6',
  };

  // 2. Classes base para o estilo de 'spinner'
  // 'animate-spin' é uma utilidade nativa do Tailwind.
  // 'border-t-transparent' remove a borda superior para criar o efeito de giro.
  const baseClasses = `animate-spin rounded-full border-solid ${sizeClasses[size]} ${color} border-t-transparent`;

  return (
    // Usa um wrapper simples para centralização se necessário
    <div className="flex items-center justify-center">
      <div 
        className={baseClasses} 
        role="status" 
        aria-label="loading"
      />
    </div>
  );
};

export default Loader;