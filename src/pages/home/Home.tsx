import { useState } from 'react';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Theme Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="bg-primary text-content-bright px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 text-content-default">
        Explore Filmes
      </h1>

      <div className="text-center">
        <p className="text-lg text-content-ghost mb-8">
          Descubra os melhores filmes e crie suas listas personalizadas
        </p>

        {/* Design Tokens Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Primary Card */}
          <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Primary Color
            </h3>
            <p className="text-content-default mb-4">
              Demonstração da cor primária do sistema
            </p>
            <button className="bg-primary text-content-bright px-4 py-2 rounded hover:opacity-90">
              Botão Primário
            </button>
          </div>

          {/* Secondary Card */}
          <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
            <h3 className="text-xl font-semibold mb-3 text-secondary">
              Secondary Color
            </h3>
            <p className="text-content-default mb-4">
              Demonstração da cor secundária do sistema
            </p>
            <button className="bg-secondary text-content-bright px-4 py-2 rounded hover:opacity-90">
              Botão Secundário
            </button>
          </div>

          {/* Status Colors Card */}
          <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
            <h3 className="text-xl font-semibold mb-3 text-content-default">
              Status Colors
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-status-positive rounded"></div>
                <span className="text-status-positive">Success</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-status-warning rounded"></div>
                <span className="text-status-warning">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-status-negative rounded"></div>
                <span className="text-status-negative">Error</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
          <h2 className="text-2xl font-semibold mb-4 text-content-default">
            Em breve...
          </h2>
          <p className="text-content-ghost">
            Integração com a API do The Movie Database (TMDB) será implementada
            aqui
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
