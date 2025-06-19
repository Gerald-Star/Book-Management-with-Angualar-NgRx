# Book Catalog Management

# This project highlights the understanding of Angular NgRx State Management: BookReducer (NgRx State Management) and BookEffects (NgRx Effects for Side-Effect Handling)

Using NgRx state management to handle application state in a reactive, scalable way — specifically managing the state of a list of books. It uses reducers, effects, and dev tools from NgRx to streamline data flow and handle side effects.

## Summary of this Project.
In this project, I integrated NgRx into an Angular application to manage the state of a book list. I used StoreModule to register a reducer, implemented BookEffects for side effects (e.g., API calls), and enabled StoreDevtoolsModule for real-time debugging. This architecture ensures clean state management, better scalability, and easier debugging for complex applications.


![Book Catalog Management](https://github.com/Gerald-Star/Book-Management-with-Angualar-NgRx/blob/cf5622f594a8c95bb9a68d2ffb1285aace19d999/Angular%20Project%201%20cover.png)


### Click down to watch the video

[![Watch the video](https://github.com/Gerald-Star/Book-Management-with-Angualar-NgRx/blob/05da4d1bb831039b0f2ed63a151c17dd75d29868/devtools%202.png)](https://youtu.be/hdzMU6Sph84)

### BookReducer (NgRx State Management)
In this reducer, I implemented NgRx to manage an array of books. I handled actions like AddBook, AddBookSuccess, and RemoveBook with a clear, immutable pattern. For async operations, I used AddBook as a trigger and AddBookSuccess/AddBookFailure to update the state accordingly. This separation of concerns improves scalability and testability of my app’s state logic.

## BookEffects (NgRx Effects for Side-Effect Handling)
This class uses NgRx Effects to handle side effects like HTTP requests when interacting with a book API. It's a clean and scalable way to decouple asynchronous operations (e.g., adding a book) from the component logic

## BookService Documentation (with example implementation)
```
 book.service.ts
```
I created an NgRx effect addBook$ to handle the asynchronous process of adding a book. When the AddBook action is dispatched, this effect calls a bookService method, and depending on the outcome, dispatches either AddBookSuccess or AddBookFailure. This allows me to manage complex side effects outside of components, keeping the UI reactive, clean, and testable.

## Breakdown of Key Parts

### Basic Angular modules to bootstrap the app in the browser.

```
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

```

NgRx modules that provide:

StoreModule: The global reactive store.

EffectsModule: For handling asynchronous actions like API calls.

StoreDevtoolsModule: Debugging tool for tracking state changes.


### App-Specific Imports

```
import { BookReducer } from './books/book.reducer';
import { AppState } from './app.state';
import { BookEffects } from './books/book.effects';

```

BookReducer: A pure function that defines how the book state changes based on actions.

AppState: An interface describing the structure of the application’s state.

BookEffects: Contains side-effect logic like API calls in response to NgRx actions.

## Effects and DevTools

```
EffectsModule.forRoot([BookEffects]),
StoreDevtoolsModule.instrument()

```

Registers BookEffects to listen for actions like fetching books from an API.

Enables DevTools, letting developers inspect past state changes in the Redux DevTools extension.

## DevStore Tool
![DevTool](https://github.com/Gerald-Star/Book-Management-with-Angualar-NgRx/blob/05da4d1bb831039b0f2ed63a151c17dd75d29868/devtools%202.png)


##  Module Configuration

```
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent
  ],
```

### Declares the root component and a book list component to render UI.

```
imports: [
  BrowserModule,
  AppRoutingModule,


```

## NgRx Store Setup
Sets up standard Angular app routing and rendering.

```
StoreModule.forRoot<AppState>({ book: BookReducer }),

```


Sets up the root store using AppState, where:

book is the key in the global state tree.

BookReducer handles changes to the book state slice.


## BookReducer (NgRx State Management)
This file defines the BookReducer, a pure function used in NgRx state management to handle how the application's book-related state changes in response to actions.

## Initial State

```
export const initialState: Book[] = [];
```


Defines the initial state as an empty array of books.

The Book model represents the shape of each book object.

This state will grow or shrink as books are added or removed.


##  Reducer Definition

```
export const BookReducer = createReducer(
  initialState,
  ...
);

```

Uses createReducer() to define how the state responds to different dispatched actions.

Inside, we use on() to match specific actions and update the state accordingly.


## Reducer Stages & Action Handlers
### ✅ AddBook (Stage 2 - No State Change)

```
on(AddBook, (state) => { return state }),

```

In this placeholder stage, the AddBook action doesn't change the state yet.

This mimics a side-effect-driven action — typically, this action would trigger an Effect (like an API call), and only upon success or failure, the state would update via AddBookSuccess or AddBookFailure.

### ✅ AddBookSuccess (Handle State Update After Async Success)

```
on(AddBookSuccess, (state, { id, title, author, publishedDate, genre, summary, rating, isAvailable }) => [
  ...state,
  { id, title, author, publishedDate, genre, summary, rating, isAvailable }
]),

```
This is the actual state-changing action.

It creates a new book object and appends it to the existing state array (...state).

Ensures immutability by returning a new array instead of modifying the original state.

This simulates a successful response from an API or backend operation.

### ❌ AddBookFailure (Handle Error)

```
on(AddBookFailure, (state, { error }) => {
  console.error('Add book failed:', error);
  return state;
}),


```
If the add operation fails (e.g., due to a server error), the state remains unchanged.

The error is logged to help with debugging.


### 🗑️ RemoveBook (Stage 3 - Delete Book by ID)

```
on(RemoveBook, (state, { bookId }) => state.filter(book => book.id !== bookId))

```
This action removes a book from the state by filtering out the one that matches the bookId.

Again, this is immutable: a new array is returned without the deleted book.

It's useful for features like delete buttons, admin tools, or wishlist management.

## BookEffects (NgRx Effects for Side-Effect Handling)
This class uses NgRx Effects to handle side effects like HTTP requests when interacting with a book API. It's a clean and scalable way to decouple asynchronous operations (e.g., adding a book) from the component logic.

### Core Imports

```
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';


```

Actions: A stream of all dispatched actions in the app.

createEffect: Used to define effects.

ofType: Filters actions by type.

mergeMap: Handles multiple concurrent API calls.

map: Transforms emitted values.

catchError + of: Handles errors gracefully.


###  What This Effect Does
#### ✅ addBook$ Effect

```
addBook$ = createEffect(() =>
  this.actions$.pipe(
    ofType(bookActions.AddBook),
    mergeMap((action) => 
      this.bookService.addBook(action).pipe(
        map(book => bookActions.AddBookSuccess(book)),
        catchError(error => of(bookActions.AddBookFailure({ error })))
      )
    )
  )
);

```

## Step-by-Step Explanation
### Trigger:

The effect listens for the AddBook action using ofType(bookActions.AddBook).

### API Call:

Once triggered, it uses mergeMap() to call the bookService.addBook() method.

action contains the book details needed for the service to process the addition.

### On Success:

If the book is added successfully (e.g., response from backend), it maps the result to a AddBookSuccess action using map().

### On Failure:

If an error occurs (e.g., server error), it catches it with catchError() and dispatches an AddBookFailure action.

### Why mergeMap?
Allows multiple AddBook actions to run concurrently (e.g., if the user quickly adds multiple books).

If you wanted to cancel a previous request when a new one comes in (e.g., for search), you'd use switchMap.

### Constructor
```
constructor(
  private actions$: Actions,
  private bookService: BookService
) {}
Injects:

actions$: Stream of all actions.

bookService: Your service layer handling the HTTP requests or local operations.


```

## BookService Documentation (with example implementation)
```
 book.service.ts
```

I created an NgRx effect addBook$ to handle the asynchronous process of adding a book. When the AddBook action is dispatched, this effect calls a bookService method, and depending on the outcome, dispatches either AddBookSuccess or AddBookFailure. This allows me to manage complex side effects outside of components, keeping the UI reactive, clean, and testable.


```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://api.example.com/books'; // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  // Adds a new book via POST request
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // (Optional) Get all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // (Optional) Remove book by ID
  removeBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}


```
## ng generate interface models/book

## How to create components, models. service and interface and their purpose

## What does ng generate mean / example app.state

## what is the difference between the effects and the reducer in NgRx?
  In NgRx, effects and reducers serve different purposes in managing state and handling side effects in an Angular application:

1. **Reducers**:
   - **Purpose**: Reducers are pure functions that take the current state and an action, and return a new state. They are responsible for updating the state of the application based on the actions dispatched.
   - **Characteristics**: 
     - They do not have side effects (e.g., making HTTP requests, logging, etc.).
     - They must be pure functions, meaning they should not modify the input state directly but return a new state object.
     - They are synchronous and execute immediately when an action is dispatched.

2. **Effects**:
   - **Purpose**: Effects are used to handle side effects in the application, such as making HTTP requests, interacting with external APIs, or performing asynchronous operations. They listen for specific actions and can dispatch new actions based on the results of those operations.
   - **Characteristics**:
     - They can perform asynchronous operations and are often used to interact with services.
     - They can dispatch multiple actions based on the outcome of the side effects (e.g., success or failure).
     - They are typically implemented using RxJS operators to manage streams of actions and responses.


In summary, reducers are responsible for updating the state in response to actions, while effects handle side effects and can dispatch new actions based on the results of those operations. Together, they help manage the state and behavior of an Angular application using NgRx.

Effects are typically used for handling asynchronous operations, such as API calls, while reducers are used to update the state based on the actions dispatched.

Effects are typically used for handling asynchronous operations, such as API calls, while reducers are used to update the state based on the actions dispatched.

In summary, reducers are responsible for updating the state in response to actions, while effects handle side effects and can dispatch new actions based on the results of those operations. Together, they help manage the state and behavior of an Angular application using NgRx.


## What is the purpose of the `switchMap` operator in the context of NgRx effects?
  The`switchMap` operator in the context of NgRx effects is used to handle the transformation of an observable stream of actions into another observable stream, typically for performing asynchronous operations such as API calls.Here’s a breakdown of its purpose:

1. **Switching Streams**: `switchMap` allows you to switch from one observable to another. When a new action is dispatched, it cancels any previous observable that was still in progress and subscribes to the new one. This is particularly useful for scenarios where you want to ensure that only the latest action is processed, such as when a user rapidly triggers actions (e.g., typing in a search box).
2. ** Handling Asynchronous Operations **: In NgRx effects, `switchMap` is commonly used to handle asynchronous operations like HTTP requests.When an action is dispatched, `switchMap` can call a service method that returns an observable(e.g., an HTTP request) and then map the result of that observable to a new action.

3. ** Error Handling **: `switchMap` can be combined with operators like `catchError` to handle errors that may occur during the asynchronous operation.If an error occurs, you can dispatch a failure action or handle the error appropriately.
4. ** Returning New Actions **: After the asynchronous operation completes, `switchMap` can map the result to a new action that will be dispatched to update the state or trigger further effects.


In summary, `switchMap` is a powerful operator in NgRx effects that allows you to manage asynchronous operations by switching to a new observable stream whenever a new action is dispatched, ensuring that only the latest action is processed and enabling effective error handling and state updates.It helps maintain a clean and efficient flow of actions and state changes in an Angular application using NgRx.

It is particularly useful for handling scenarios where you want to ensure that only the latest action is processed, such as when a user rapidly triggers actions (e.g., typing in a search box).

It helps maintain a clean and efficient flow of actions and state changes in an Angular application using NgRx.

## Difference between switchMap and mergeMap in NgRx effects?
  The main difference between `switchMap` and`mergeMap` in NgRx effects lies in how they handle the observable streams and the behavior when new actions are dispatched:
1. **switchMap**:
   - **Behavior**: When a new action is dispatched, `switchMap` cancels the previous observable and switches to the new one. This means that if multiple actions are dispatched in quick succession, only the latest action will be processed, and any ongoing operations from previous actions will be ignored.
   - ** Use Case **: It is typically used in scenarios where you want to ensure that only the most recent action is handled, such as in search functionality or when dealing with user input that can change rapidly.
2. **mergeMap**:
   - **Behavior**: `mergeMap` allows multiple inner observables to run concurrently. When a new action is dispatched, it does not cancel the previous observable; instead, it subscribes to the new observable while keeping the previous ones active. This means that all actions will be processed, and their results will be merged into a single output stream.
   - ** Use Case **: It is typically used in scenarios where you want to handle multiple actions simultaneously, such as when fetching data from an API for multiple requests without canceling any ongoing requests.

In summary, use `switchMap` when you want to cancel previous operations and only handle the latest action, and use `mergeMap` when you want to allow multiple operations to run concurrently without canceling any ongoing ones. The choice between the two depends on the specific requirements of your application and how you want to manage the flow of actions and state changes.

In summary, `switchMap` is used to switch to a new observable and cancel any previous ones, while `mergeMap` allows multiple observables to run concurrently without canceling previous ones. The choice between the two depends on the specific requirements of your application and how you want to manage the flow of actions and state changes.

