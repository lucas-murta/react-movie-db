import React from 'react';
import { ButtonProps } from './Button.types';

const getVariantClasses = (
  variant: string,
  color: string,
  disabled: boolean
) => {
  const baseClasses =
    'h-12 px-2 font-medium rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2';

  if (disabled) {
    return `${baseClasses} bg-gray-300 text-gray-500`;
  }

  switch (variant) {
    case 'solid':
      switch (color) {
        case 'primary':
          return `${baseClasses} bg-primary text-content-primary hover:bg-blue-600`;
        case 'secondary':
          return `${baseClasses} bg-secondary text-content-primary hover:bg-purple-600`;
        case 'positive':
          return `${baseClasses} bg-surface-positive text-content-primary hover:bg-green-700`;
        case 'negative':
          return `${baseClasses} bg-surface-negative text-content-primary hover:bg-red-700`;
        default:
          return `${baseClasses} bg-primary text-content-primary`;
      }
    case 'outline':
      switch (color) {
        case 'primary':
          return `${baseClasses} border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-content-primary`;
        case 'secondary':
          return `${baseClasses} border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-content-primary`;
        case 'positive':
          return `${baseClasses} border-2 border-surface-positive text-surface-positive bg-transparent hover:bg-surface-positive hover:text-content-primary`;
        case 'negative':
          return `${baseClasses} border-2 border-surface-negative text-surface-negative bg-transparent hover:bg-surface-negative hover:text-content-primary`;
        default:
          return `${baseClasses} border-2 border-primary text-primary bg-transparent`;
      }
    case 'text':
      switch (color) {
        case 'primary':
          return `${baseClasses} text-primary bg-transparent hover:bg-blue-50`;
        case 'secondary':
          return `${baseClasses} text-secondary bg-transparent hover:bg-purple-50`;
        case 'positive':
          return `${baseClasses} text-surface-positive bg-transparent hover:bg-green-50`;
        case 'negative':
          return `${baseClasses} text-surface-negative bg-transparent hover:bg-red-50`;
        default:
          return `${baseClasses} text-primary bg-transparent`;
      }
    default:
      return `${baseClasses} bg-primary text-content-primary`;
  }
};

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  color = 'primary',
  onClick,
  children,
  disabled = false,
  type = 'button',
}) => {
  const classes = getVariantClasses(variant, color, disabled);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick && !disabled) {
        onClick();
      }
    }
  };

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
};

export default Button;
