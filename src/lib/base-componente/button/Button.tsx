import type { ButtonProps } from './Button.types';

const Button = ({
  variant = 'solid',
  color = 'primary',
  onClick,
  children,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const getVariantClasses = () => {
    const baseClasses =
      'h-12 px-2 rounded transition-colors duration-200 font-medium';

    const variantClasses = {
      solid: {
        primary: 'bg-primary text-content-primary hover:opacity-90',
        secondary: 'bg-secondary text-content-primary hover:opacity-90',
        positive: 'bg-surface-positive text-content-primary hover:opacity-90',
        negative: 'bg-surface-negative text-content-primary hover:opacity-90',
      },
      outline: {
        primary:
          'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-content-primary',
        secondary:
          'border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-content-primary',
        positive:
          'border-2 border-surface-positive text-surface-positive bg-transparent hover:bg-surface-positive hover:text-content-primary',
        negative:
          'border-2 border-surface-negative text-surface-negative bg-transparent hover:bg-surface-negative hover:text-content-primary',
      },
      text: {
        primary:
          'text-primary bg-transparent hover:bg-primary hover:bg-opacity-10',
        secondary:
          'text-secondary bg-transparent hover:bg-secondary hover:bg-opacity-10',
        positive:
          'text-surface-positive bg-transparent hover:bg-surface-positive hover:bg-opacity-10',
        negative:
          'text-surface-negative bg-transparent hover:bg-surface-negative hover:bg-opacity-10',
      },
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:opacity-50';

    return `${baseClasses} ${variantClasses[variant][color]} ${disabled ? disabledClasses : ''}`;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={getVariantClasses()}
    >
      {children}
    </button>
  );
};

export default Button;
