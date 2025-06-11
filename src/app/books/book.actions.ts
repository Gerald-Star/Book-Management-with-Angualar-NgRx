
// create actions file for book management
import { createAction, props } from '@ngrx/store'; // Import necessary functions from @ngrx/store
import { Book } from '../models/book'; // Import the Book model


// Define actions for book management
/*export const LoadBooks = createAction('[Book] Load Books');
export const AddBook = createAction('[Book] Add Book', props<{ book: Book }>());
export const UpdateBook = createAction('[Book] Update Book', props<{ book: Book }>());
export const DeleteBook = createAction('[Book] Delete Book', props<{ bookId: string }>()); */

export const AddBook = createAction('[Book] Add Book', props<Book>());

export const AddBookSuccess = createAction('[Book] Add Book Success', props<Book>());
export const AddBookFailure = createAction('[Book] Add Book Failure', props<{ error: string }>());
export const RemoveBook = createAction( '[Book] Remove Book', props<{ bookId: string }>());