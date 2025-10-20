import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from '../pages/home';
import MovieDetails from '../pages/movie-details';
import Favorites from '../pages/favorites';
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
    console.log('Search query:', event.query);
    // TODO: Implement search functionality
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default AppRouter;
