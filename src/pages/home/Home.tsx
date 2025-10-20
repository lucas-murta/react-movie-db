import { useState, useEffect } from 'react';
import { MovieCard, Pagination } from '../../lib/component';
import type { Movie } from '../../services/types';
import { moviesService } from '../../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await moviesService.getDiscoveryMovies(page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError('Erro ao carregar filmes. Tente novamente mais tarde.');
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    loadMovies(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-secondary mx-auto"></div>
          <p className="text-lg text-content-ghost mt-4">
            Carregando filmes...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <FontAwesomeIcon
            icon="exclamation-triangle"
            className="text-6xl text-surface-negative mb-4"
          />
          <h2 className="text-2xl font-bold text-content-default mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-lg text-content-ghost">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      {movies.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <FontAwesomeIcon
            icon="film"
            className="text-6xl text-content-ghost mb-4"
          />
          <p className="text-lg text-content-ghost">Nenhum filme encontrado.</p>
        </div>
      )}

      {movies.length > 0 && totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="justify-center"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
