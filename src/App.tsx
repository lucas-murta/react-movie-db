import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import { useTheme } from './hooks/useTheme';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './lib/component';

function App() {
  useTheme();

  return (
    <ToastProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-surface-2 text-content-default">
          <Router>
            <AppRouter />
          </Router>
          <ToastContainer />
        </div>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;
