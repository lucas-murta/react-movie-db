import AppRouter from './router';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme();

  return (
    <div className="min-h-screen bg-surface-2 text-content-default">
      <AppRouter />
    </div>
  );
}

export default App;
