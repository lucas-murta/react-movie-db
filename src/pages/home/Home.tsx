import { useState } from 'react';
import { Button, Input, Select, Chips } from '../../lib/base-componente';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setInputValue(target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setSearchValue(target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setSelectedGenre(target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <FontAwesomeIcon
          icon="clapperboard"
          className="text-6xl text-secondary mb-4"
        />
        <h1 className="text-4xl font-bold text-content-default">
          Explore Filmes
        </h1>
      </div>

      <div className="text-center">
        <p className="text-lg text-content-ghost mb-8">
          Descubra os melhores filmes e crie suas listas personalizadas
        </p>

        {/* Input Component Demo */}
        <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-content-default">
            Demonstração do Componente Input
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-content-default mb-2">
                Input Básico
              </label>
              <Input
                placeholder="Digite algo aqui..."
                value={inputValue}
                onChange={(event) => handleInputChange(event)}
              />
              {inputValue && (
                <p className="text-sm text-content-ghost mt-2">
                  Valor: {inputValue}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-content-default mb-2">
                Buscar Filmes
              </label>
              <Input
                placeholder="Buscar filmes..."
                value={searchValue}
                onChange={(event) => handleSearchChange(event)}
                name="search"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-content-default mb-2">
                Input Desabilitado
              </label>
              <Input placeholder="Este input está desabilitado" disabled />
            </div>
          </div>
        </div>

        {/* Select Component Demo */}
        <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-content-default">
            Demonstração do Componente Select
          </h2>
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-sm font-medium text-content-default mb-2">
                Selecionar Gênero
              </label>
              <Select
                placeholder="Escolha um gênero..."
                value={selectedGenre}
                onChange={handleGenreChange}
                options={[
                  { value: 'action', label: 'Ação' },
                  { value: 'comedy', label: 'Comédia' },
                  { value: 'drama', label: 'Drama' },
                  { value: 'horror', label: 'Terror' },
                  { value: 'romance', label: 'Romance' },
                  { value: 'scifi', label: 'Ficção Científica' },
                  { value: 'thriller', label: 'Thriller', disabled: true },
                ]}
              />
              {selectedGenre && (
                <p className="text-sm text-content-ghost mt-2">
                  Gênero selecionado: {selectedGenre}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-content-default mb-2">
                Select Desabilitado
              </label>
              <Select
                placeholder="Este select está desabilitado"
                disabled
                options={[
                  { value: 'option1', label: 'Opção 1' },
                  { value: 'option2', label: 'Opção 2' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Chips Component Demo */}
        <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-content-default">
            Demonstração do Componente Chips
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-content-default mb-3">
                Chips por Cores
              </label>
              <div className="flex flex-wrap gap-2">
                <Chips color="primary">Primary</Chips>
                <Chips color="warning">Warning</Chips>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-content-default mb-3">
                Gêneros de Filmes
              </label>
              <div className="flex flex-wrap gap-2">
                <Chips color="primary">Ação</Chips>
                <Chips color="primary">Comédia</Chips>
                <Chips color="primary">Drama</Chips>
                <Chips color="warning">Terror</Chips>
                <Chips color="primary">Romance</Chips>
                <Chips color="primary">Ficção Científica</Chips>
                <Chips color="warning">Thriller</Chips>
              </div>
            </div>
          </div>
        </div>

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
            <Button>Botão Primário</Button>
          </div>

          {/* Secondary Card */}
          <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
            <h3 className="text-xl font-semibold mb-3 text-secondary">
              Secondary Color
            </h3>
            <p className="text-content-default mb-4">
              Demonstração da cor secundária do sistema
            </p>
            <Button color="secondary">Botão Secundário</Button>
          </div>

          {/* Status Colors Card */}
          <div className="bg-surface-1 rounded-lg shadow-md p-6 border border-surface-2">
            <h3 className="text-xl font-semibold mb-3 text-content-default">
              Status Colors
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button color="positive">Botão positive</Button>
              </div>
              <div className="flex items-center gap-2">
                <Button color="negative">Botão negative</Button>
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
