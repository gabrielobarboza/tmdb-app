import { useTheme } from '@/hooks/useTheme';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      className="cursor-pointer px-3 rounded-4xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};
