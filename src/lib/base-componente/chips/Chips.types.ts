export type ChipsColor = 'primary' | 'warning';

export interface ChipsProps {
  color?: ChipsColor;
  children: React.ReactNode;
  className?: string;
}
