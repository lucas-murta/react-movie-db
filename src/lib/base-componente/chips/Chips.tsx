import type { ChipsProps } from './Chips.types';

const Chips = ({ color = 'primary', children, className = '' }: ChipsProps) => {
  const getChipsClasses = () => {
    const baseClasses = [
      'h-6',
      'px-3',
      'rounded-full',
      'transition-colors',
      'duration-200',
      'font-medium',
      'text-sm',
      'inline-flex',
      'items-center',
      'justify-center',
      'cursor-default',
    ];

    const colorClasses = {
      primary: 'bg-primary text-content-primary',
      warning: 'bg-surface-warning text-content-primary',
    };

    return `${baseClasses.join(' ')} ${colorClasses[color]} ${className}`;
  };

  return <span className={getChipsClasses()}>{children}</span>;
};

export default Chips;
