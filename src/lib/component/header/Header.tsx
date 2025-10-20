import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClapperboard,
  faHome,
  faHeart,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header
      className={`bg-surface-1 border-b border-border-0 shadow-sm ${className}`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-row sm:items-center sm:h-16 py-3 sm:py-0 gap-3 sm:gap-0">
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

          <div className="flex-1 hidden sm:block sm:max-w-md sm:mx-8 order-last sm:order-none">
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
          <nav
            className="hidden sm:flex items-center space-x-4"
            data-testid="header-nav"
          >
            <Button
              variant={currentPage === 'home' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('home')}
              data-testid="nav-home"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Button>
            <Button
              variant={currentPage === 'favorites' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('favorites')}
              data-testid="nav-favorites"
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Favoritos
            </Button>
          </nav>
          <nav
            className="flex sm:hidden justify-end items-center space-x-4"
            data-testid="header-nav"
          >
            <Button
              variant={currentPage === 'home' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('home')}
              data-testid="nav-home"
              iconButton={true}
            >
              <FontAwesomeIcon icon={faHome} />
            </Button>
            <Button
              variant={currentPage === 'favorites' ? 'solid' : 'text'}
              color="primary"
              onClick={() => handleNavigate('favorites')}
              data-testid="nav-favorites"
              iconButton={true}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button
              variant={showMobileSearch ? 'solid' : 'text'}
              color="primary"
              onClick={toggleMobileSearch}
              data-testid="nav-search"
              iconButton={true}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </nav>
        </div>
        <div className={`flex-1 ${showMobileSearch ? 'block' : 'hidden'} m-4`}>
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
      </div>
    </header>
  );
}
