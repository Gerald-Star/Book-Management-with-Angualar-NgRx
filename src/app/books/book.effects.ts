import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from './book.service'; // Import the BookService to handle book-related operations
import * as bookActions from './book.actions'; // Import all actions from book.actions
import { mergeMap, map, catchError, of } from 'rxjs'; // Import operators for handling asynchronous operations
 // Import of to create an observable from a value


@Injectable()
export class BookEffects {

  /*============================================================================
   Define NgRx effects that handles AddBook and RemoveBook actions
   - Effects listen for specific actions dispatched by the application
   - They perform side effects such as API calls or other asynchronous operations
  ==============================================================================*/
  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.AddBook), // Listen for the AddBook action
      /*=============================================================================
      - When the AddBook action is dispatched, it triggers this effect
      Call the bookService to add the book and map the result to a success action
      switchMap is used to switch to a new observable when the action is dispatched.
      switchMap allows the effect to handle the asynchronous operation of adding a book.
      It cancels the previous request if a new one comes in
       ===============================================================================*/
      mergeMap((action) => 
        this.bookService.addBook(action).pipe(
          map(book => bookActions.AddBookSuccess(book)), // Dispatch AddBookSuccess with the added book
          
          //  If the operation fails, catch the error and map it to a failure action 
          catchError(error => of(bookActions.AddBookFailure({ error }))) // Dispatch AddBookFailure on error
        ))
    ));


  constructor(
    private actions$: Actions,
    private bookService: BookService

  ) {}


}

