import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import { useTheme } from './hooks/useTheme';
import { FavoritesProvider } from './contexts/FavoritesContext';

function App() {
  useTheme();

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-surface-2 text-content-default">
        <Router>
          <AppRouter />
        </Router>
      </div>
    </FavoritesProvider>
  );
}

export default App;
