import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply correct variant classes', () => {
    render(
      <Button variant="outline" color="primary">
        Outline Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-2', 'border-primary');
  });

  it('should apply correct color classes', () => {
    render(
      <Button variant="solid" color="positive">
        Positive Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-surface-positive');
  });
});
