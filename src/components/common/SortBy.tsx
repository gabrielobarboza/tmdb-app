import React from 'react';
import { sortOptions, SortType } from '@/config/sortOptions';

interface SortByProps {
  sortType: SortType;
  onSortChange: (sortType: SortType) => void;
}

export const SortBy: React.FC<SortByProps> = ({ sortType, onSortChange }) => {
  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="sort-select" className="text-gray-400 text-sm">Ordenar por:</label>
      <select
        id="sort-select"
        value={sortType}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.type} value={option.type}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
