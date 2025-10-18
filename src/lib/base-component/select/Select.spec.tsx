import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import type { SelectOption } from './Select.types';
import { describe, expect, it, vi } from 'vitest';

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  it('renders correctly with options', () => {
    render(<Select options={mockOptions} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('handles value prop correctly', () => {
    render(<Select options={mockOptions} value="option2" />);

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe('option2');
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option1' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={mockOptions} disabled />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });

  it('renders disabled options correctly', () => {
    render(<Select options={mockOptions} />);

    const option3 = screen.getByText('Option 3').closest('option');
    expect(option3).toBeDisabled();
  });

  it('calls onFocus when focused', () => {
    const handleFocus = vi.fn();
    render(<Select options={mockOptions} onFocus={handleFocus} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.focus(selectElement);

    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when blurred', () => {
    const handleBlur = vi.fn();
    render(<Select options={mockOptions} onBlur={handleBlur} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.blur(selectElement);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
