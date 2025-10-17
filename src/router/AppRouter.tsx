import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import MovieDetails from '../pages/movie-details';
import Favorites from '../pages/favorites';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
