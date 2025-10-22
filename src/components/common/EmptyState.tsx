import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa'; // Ícone de coração partido

interface EmptyStateProps {
  title: string;
  message: string;
  ctaText?: string; // Texto do Call-to-Action
  ctaLink?: string; // Link do Call-to-Action
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, ctaText, ctaLink }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 my-8 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-2xl">
      <FaHeartBroken data-testid="heart-broken-icon" className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-grey-800 dark:text-white mb-2">{title}</h2>
      <p className="text-grey-600 dark:text-gray-400 mb-6 px-10 max-w-md">{message}</p>
      
      {/* Call-to-Action (CTA) opcional */}
      {ctaLink && ctaText && (
        <NavLink
          to={ctaLink}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          {ctaText}
        </NavLink>
      )}
    </div>
  );
};

export default EmptyState;