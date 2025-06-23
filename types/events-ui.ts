export interface Category {
  id: string;
  name: string;
}

export interface EventCardProps {
  event: Event;
  viewMode: 'grid' | 'list';
  onClick: (event: Event) => void;
}

export interface EventFilterState {
  searchQuery: string;
  selectedCategory: string;
  currentPage: number;
  viewMode: 'grid' | 'list';
}

export interface EventError {
  message: string;
  code?: string;
  retry?: () => void;
}

export interface PaginationConfig {
  itemsPerPage: number;
  showSizeOptions?: boolean;
  sizeOptions?: number[];
}
