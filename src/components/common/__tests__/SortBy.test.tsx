import { render, screen, fireEvent } from '@testing-library/react';
import { SortBy } from '../SortBy';
import { SortType } from '@/config/sortOptions';

describe('SortBy', () => {
  const mockOnSortChange = jest.fn();
  const defaultProps = {
    sortType: 'title_asc' as SortType,
    onSortChange: mockOnSortChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o label corretamente', () => {
    render(<SortBy {...defaultProps} />);
    expect(screen.getByText('Ordenar por:')).toBeInTheDocument();
  });

  it('deve renderizar todas as opções de ordenação', () => {
    render(<SortBy {...defaultProps} />);

    const expectedOptions = [
      'Título (A-Z)',
      'Título (Z-A)',
      'Nota (Maior-Menor)',
      'Nota (Menor-Maior)',
    ];

    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');

    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(expectedOptions.length);

    expectedOptions.forEach(optionText => {
      expect(screen.getByText(optionText)).toBeInTheDocument();
    });
  });

  it('deve ter o valor inicial correto', () => {
    render(<SortBy {...defaultProps} />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('title_asc');
  });

  it('deve chamar onSortChange ao selecionar uma nova opção', () => {
    render(<SortBy {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'rating_desc' } });

    expect(mockOnSortChange).toHaveBeenCalledWith('rating_desc');
  });

  it('deve aplicar classes de estilo corretamente', () => {
    render(<SortBy {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
      'bg-gray-200',
      'dark:bg-gray-700',
      'text-grey-900',
      'dark:text-gray-200',
      'p-2',
      'rounded-lg',
    );

    const label = screen.getByText('Ordenar por:');
    expect(label).toHaveClass('text-gray-600', 'dark:text-gray-400', 'text-sm');
  });

  it('deve atualizar a seleção quando o sortType muda', () => {
    const { rerender } = render(<SortBy {...defaultProps} />);
    
    let select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('title_asc');

    // Rerender com novo sortType
    rerender(<SortBy sortType="rating_desc" onSortChange={mockOnSortChange} />);
    
    select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('rating_desc');
  });
});