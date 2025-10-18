import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../base-component/button';
import { Input } from '../../base-component/input';
import type { HeaderProps, MenuItem } from './Header.types';

export function Header({
  currentPage = 'home',
  onSearch,
  onNavigate,
  className = '',
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch({ query: searchQuery.trim() });
    }
  };

  const handleNavigate = (page: MenuItem) => {
    if (onNavigate) {
      onNavigate({ page });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header
      className={`bg-surface-1 border-b border-border-0 shadow-sm ${className}`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-3"
            data-testid="header-logo"
          >
            <FontAwesomeIcon
              icon={faClapperboard}
              className="text-2xl text-secondary"
            />
            <h1 className="text-xl font-bold text-content-default">MovieDB</h1>
          </div>
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} data-testid="search-form">
              <div className="relative">
                <Input
                  placeholder="Buscar filmes"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  class-name="w-full pl-10 pr-4"
                  data-testid="search-input"
                />
              </div>
            </form>
          </div>
          <nav className="flex items-center space-x-4" data-testid="header-nav">
            <Button
              variant={currentPage === 'home' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('home')}
              data-testid="nav-home"
            >
              Home
            </Button>
            <Button
              variant={currentPage === 'favorites' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('favorites')}
              data-testid="nav-favorites"
            >
              Favoritos
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
