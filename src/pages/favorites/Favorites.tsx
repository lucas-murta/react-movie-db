import { useFavorites } from '../../hooks/useFavorites';
import { Button } from '../../lib/base-component';
import { MovieCard } from '../../lib/component';

const Favorites = () => {
  const { favorites, favoritesCount, clearFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-surface-primary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-content-default">
            Favoritos ({favoritesCount})
          </h1>
          {favoritesCount > 0 && (
            <Button onClick={clearFavorites} color="negative">
              Limpar Favoritos
            </Button>
          )}
        </div>

        {favoritesCount === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-content-default mb-4">
              Você ainda não tem filmes favoritos
            </p>
            <p className="text-content-default">
              Explore filmes e adicione aos seus favoritos clicando no ícone de
              coração
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="w-full" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
