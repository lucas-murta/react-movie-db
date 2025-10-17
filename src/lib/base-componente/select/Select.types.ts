import type { ChangeEvent, FocusEvent, MouseEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  onClick?: (event: MouseEvent<HTMLSelectElement>) => void;
}
