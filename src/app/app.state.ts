
import { Book} from './models/book';

export interface AppState {
  readonly book: Book[];
  

  /*
  books: Book[];
  readonly selectedBook: Book | null;
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: 'title' | 'author' | 'publishedDate' | 'rating';
  filterByGenre: string | null;
  page: number;
  pageSize: number;
  */
}
