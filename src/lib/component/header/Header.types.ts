export type MenuItem = 'home' | 'favorites';

export interface HeaderSearchEvent {
  query: string;
}

export interface HeaderNavigationEvent {
  page: MenuItem;
}

export interface HeaderProps {
  currentPage?: MenuItem;
  onSearch?: (event: HeaderSearchEvent) => void;
  onNavigate?: (event: HeaderNavigationEvent) => void;
  className?: string;
}
