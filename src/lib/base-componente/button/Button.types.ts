export type ButtonVariant = 'solid' | 'outline' | 'text';

export type ButtonColor = 'primary' | 'secondary' | 'positive' | 'negative';

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
