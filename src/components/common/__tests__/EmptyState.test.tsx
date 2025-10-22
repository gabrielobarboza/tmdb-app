import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmptyState } from '../EmptyState';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('EmptyState', () => {
  const mockProps = {
    title: 'Test Title',
    message: 'Test Message',
    ctaText: 'Test CTA',
    ctaLink: '/test-link',
  };

  it('deve renderizar título e mensagem corretamente', () => {
    renderWithRouter(<EmptyState title={mockProps.title} message={mockProps.message} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
  });

  it('deve renderizar o CTA quando ctaText e ctaLink são fornecidos', () => {
    renderWithRouter(
      <EmptyState
        title={mockProps.title}
        message={mockProps.message}
        ctaText={mockProps.ctaText}
        ctaLink={mockProps.ctaLink}
      />,
    );

    const ctaButton = screen.getByText(mockProps.ctaText);
    expect(ctaButton).toBeInTheDocument();
    const ctaLink = ctaButton.closest('a');
    expect(ctaLink).toHaveAttribute('href', mockProps.ctaLink);
    expect(ctaLink).toHaveClass(
      'px-6',
      'py-3',
      'bg-blue-600',
      'text-white',
      'font-semibold',
      'rounded-lg',
      'hover:bg-blue-700',
      'transition-colors',
      'shadow-lg'
    );
  });

  it('não deve renderizar o CTA quando ctaText e ctaLink não são fornecidos', () => {
    renderWithRouter(<EmptyState title={mockProps.title} message={mockProps.message} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('deve renderizar o ícone de coração partido', () => {
    renderWithRouter(<EmptyState title={mockProps.title} message={mockProps.message} />);
    
    const icon = screen.getByTestId('heart-broken-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('w-16', 'h-16', 'text-red-500', 'mb-4');
  });

  it('deve aplicar as classes de estilo corretamente', () => {
    renderWithRouter(<EmptyState title={mockProps.title} message={mockProps.message} />);

    const container = screen.getByText(mockProps.title).closest('div');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'min-h-[50vh]',
      'text-center',
      'p-8',
      'my-8',
      'rounded-xl',
      'bg-gray-100',
      'dark:bg-gray-800',
      'shadow-2xl'
    );

    const title = screen.getByText(mockProps.title);
    expect(title).toHaveClass(
      'text-2xl',
      'font-bold',
      'text-grey-800',
      'dark:text-white',
      'mb-2'
    );

    const message = screen.getByText(mockProps.message);
    expect(message).toHaveClass(
      'text-grey-600',
      'dark:text-gray-400',
      'mb-6',
      'px-10',
      'max-w-md'
    );
  });
});