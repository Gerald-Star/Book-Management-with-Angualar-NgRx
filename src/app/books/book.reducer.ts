
//* Import necessary functions from NgRx
/* ======================================================================
The reducer for managing a collection of books in an Angular application using NgRx.
=========================================================================
This reducer handles actions related to adding and removing books from the state.
A reducer is a pure function that takes the current state and an action,
and returns a new state based on the action type and payload.
=========================================================================
*/
import { createReducer, on } from "@ngrx/store";
import { AddBook, RemoveBook} from "./book.actions"; // Import actions to handle book management
import { Book } from "../models/book"; // Import the Book model

export const initialState: ReadonlyArray<Book> = []; // Initial state is an empty array of books

export const BookReducer = createReducer(
  initialState, // Start with the initial state and using on function to handle actions
  // Handle the AddBook action to add a new book to the state
  on(AddBook, (state, { id, title, author, publishedDate, genre, summary, rating, isAvailable }) => [
    ...state,
    { id, title, author, publishedDate, genre, summary, rating, isAvailable } // Add a new book to the state
  ]),
  on(RemoveBook, (state, { bookId }) => state.filter(book => book.id !== bookId)) // Remove a book by its ID

); /* ===========================================================================
Reducer makes a new state by filtering out the book with the specified ID
  - by copying the current state and making changes to it by returning new state.
=================================================================================*/













/* ========================================================================
This file defines the reducer for managing a collection of books in an Angular 
application using NgRx.
=========================================================================
This reducer handles actions related to adding and removing books from the state.
A reducer is a pure function that takes the current state and an action,
and returns a new state based on the action type and payload.

A reducer only handles a segment of the application state,
and in this case, it manages the state of books.
This file defines the reducer for managing a collection of books in an Angular application using NgRx.
book-management/src/app/books/book.reducer.ts

*/