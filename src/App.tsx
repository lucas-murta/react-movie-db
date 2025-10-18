import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme();

  return (
    <div className="min-h-screen bg-surface-2 text-content-default">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
