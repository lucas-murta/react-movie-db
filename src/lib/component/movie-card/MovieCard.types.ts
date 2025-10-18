import type { Movie } from '../../../services/types';

export type MovieCardVariant = 'add' | 'remove';

export interface MovieCardProps {
  movie: Movie;
  variant?: MovieCardVariant;
  className?: string;
  onButtonClick?: (movie: Movie, variant: MovieCardVariant) => void;
}
