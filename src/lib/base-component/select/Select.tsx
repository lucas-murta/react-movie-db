import { forwardRef } from 'react';
import type { SelectProps } from './Select.types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      value,
      name,
      disabled,
      placeholder,
      options,
      onChange,
      onFocus,
      onBlur,
      onClick,
    },
    ref
  ) => {
    const baseClasses = [
      'h-10',
      'px-4',
      'border',
      'border-border-0',
      'bg-surface-2',
      'rounded-lg',
      'text-sm',
      'transition-colors',
      'duration-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-focus',
      'focus:border-transparent',
      'w-full',
      'appearance-none',
      'cursor-pointer',
    ];

    const disabledClasses = disabled
      ? ['bg-surface-2', 'text-content-disabled', 'cursor-not-allowed']
      : ['bg-surface-2', 'text-content-default', 'hover:border-border-1'];

    const classes = [...baseClasses, ...disabledClasses].join(' ');

    return (
      <select
        ref={ref}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        className={classes}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
