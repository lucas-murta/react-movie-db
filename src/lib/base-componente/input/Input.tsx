import { forwardRef } from 'react';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      name,
      disabled = false,
      placeholder,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onClick,
      ...props
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
    ];

    const disabledClasses = disabled
      ? ['bg-surface-2', 'text-content-disabled', 'cursor-not-allowed']
      : ['bg-surface-2', 'text-content-default', 'hover:border-border-1'];

    const classes = [...baseClasses, ...disabledClasses].join(' ');

    return (
      <input
        ref={ref}
        type="text"
        value={value}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        className={classes}
        onInput={onInput}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onClick={onClick}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
