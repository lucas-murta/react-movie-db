import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toast } from './Toast';

describe('Toast Component', () => {
  it('should render check icon for positive status', () => {
    const { container } = render(
      <Toast status="positive" title="Success" message="Success message" />
    );

    const toastElement = container.firstChild;
    expect(toastElement).toHaveClass(
      'bg-surface-positive',
      'text-content-positive'
    );
  });

  it('should render times icon for negative status', () => {
    const { container } = render(
      <Toast status="negative" title="Error" message="Error message" />
    );

    const toastElement = container.firstChild;
    expect(toastElement).toHaveClass(
      'bg-surface-negative',
      'text-content-negative'
    );
  });
});
