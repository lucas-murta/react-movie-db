import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { MovieCardProps } from './MovieCard.types';
import { Chips } from '../../base-component';
import { useFavorites } from '../../../hooks/useFavorites';

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : '/placeholder-movie.jpg';

  const isMovieFavorite = isFavorite(movie.id);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getButtonIcon = () => {
    return isMovieFavorite ? faTrash : faHeart;
  };

  const getButtonColor = () => {
    return isMovieFavorite
      ? 'text-surface-negative/80 hover:text-surface-negative'
      : 'text-surface-positive/80 hover:text-surface-positive';
  };

  return (
    <div
      className={`bg-surface-1 rounded-lg shadow-md overflow-hidden border border-surface-2 transition-transform hover:scale-105 cursor-pointer relative ${className}`}
      onClick={handleCardClick}
      data-testid="movie-card"
    >
      <button
        onClick={handleButtonClick}
        className={`absolute top-2 right-2 z-10 p-2 bg-surface-2 backdrop-blur-sm rounded-full shadow-md transition-all duration-200 cursor-pointer ${getButtonColor()}`}
        data-testid="movie-action-button"
        aria-label={
          isMovieFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
      >
        <FontAwesomeIcon icon={getButtonIcon()} className="w-4 h-4" />
      </button>

      <div className="relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
          data-testid="movie-poster"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.jpg';
          }}
        />
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-semibold text-content-default mb-2 truncate"
          data-testid="movie-title"
        >
          {movie.title}
        </h3>

        <div className="mb-3">
          <Chips color="warning" data-testid="movie-rating">
            {formatRating(movie.vote_average)}
          </Chips>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
