import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { moviesService } from '../../services';
import type { Movie } from '../../services/types';
import { Button, Chips } from '../../lib/base-component';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!id) {
        setError('ID do filme não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const movieData = await moviesService.getMovieDetails(Number(id));
        setMovie(movieData);
      } catch (err) {
        setError('Erro ao carregar detalhes do filme');
        console.error('Error loading movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const getImageUrl = (path: string | null, size: string = 'w500') => {
    if (!path) return '/placeholder-movie.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-primary p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-content-primary text-xl">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-primary p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="text-content-primary text-xl">{error}</div>
            <Button onClick={handleGoBack} variant="outline" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-surface-primary p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-content-primary text-xl">
              Filme não encontrado
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage: movie.backdrop_path
          ? `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${getImageUrl(movie.backdrop_path, 'w1280')})`
          : 'linear-gradient(to bottom, #1a1a1a, #2d2d2d)',
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="p-6">
          <Button onClick={handleGoBack} variant="text" color="primary">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Voltar
          </Button>
        </div>

        <div className="flex-1 max-w-6xl mx-auto w-full p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
            <div className="flex items-center justify-center">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="max-w-full max-h-[600px] w-auto h-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-movie.jpg';
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-surface-1 rounded-lg p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-content-default mb-4">
                  {movie.title}
                </h1>

                <div className="mb-4">
                  <span className="text-content-disable">
                    Data de lançamento: {formatDate(movie.release_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-content-disable">Nota do TMDB:</span>
                  <Chips color="warning" data-testid="movie-rating">
                    {formatRating(movie.vote_average)}
                  </Chips>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-content-default mb-2">
                    Sinópse
                  </h3>
                  <p className="text-content-default leading-relaxed">
                    {movie.overview || 'Sinopse não disponível.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
