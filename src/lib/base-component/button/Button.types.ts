export type ButtonVariant = 'solid' | 'outline' | 'text';

export type ButtonColor = 'primary' | 'secondary' | 'positive' | 'negative';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  iconButton?: boolean;
}
