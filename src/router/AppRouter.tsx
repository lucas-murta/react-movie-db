import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from '../pages/home';
import MovieDetails from '../pages/movie-details';
import Favorites from '../pages/favorites';
import Search from '../pages/search';
import { Header } from '../lib/component';
import type {
  HeaderSearchEvent,
  HeaderNavigationEvent,
} from '../lib/component/header';

const AppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = (): 'home' | 'favorites' => {
    if (location.pathname === '/favorites') {
      return 'favorites';
    }
    return 'home';
  };

  const handleSearch = (event: HeaderSearchEvent) => {
    if (event.query.trim()) {
      navigate(`/search?q=${encodeURIComponent(event.query.trim())}`);
    }
  };

  const handleNavigate = (event: HeaderNavigationEvent) => {
    if (event.page === 'home') {
      navigate('/');
    } else if (event.page === 'favorites') {
      navigate('/favorites');
    }
  };

  return (
    <>
      <Header
        currentPage={getCurrentPage()}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
      />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  );
};

export default AppRouter;
