import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Loader', () => {
  it('deve renderizar com tamanho padrão (md)', () => {
    render(<Loader />);
    
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('w-10', 'h-10', 'border-4');
  });

  it('deve renderizar com tamanho pequeno', () => {
    render(<Loader size="sm" />);
    
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('w-6', 'h-6', 'border-2');
  });

  it('deve renderizar com tamanho grande', () => {
    render(<Loader size="lg" />);
    
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('w-16', 'h-16', 'border-6');
  });

  it('deve renderizar com cor padrão', () => {
    render(<Loader />);
    
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('text-blue-500');
  });

  it('deve renderizar com cor personalizada', () => {
    const customColor = 'text-red-500';
    render(<Loader color={customColor} />);
    
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass(customColor);
  });

  it('deve incluir classes base corretas', () => {
    render(<Loader />);
    
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('animate-spin', 'rounded-full', 'border-solid', 'border-t-transparent');
  });

  it('deve ser envolvido por um container flex centralizado', () => {
    const { container } = render(<Loader />);
    
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv).toHaveClass('flex', 'items-center', 'justify-center');
  });
});