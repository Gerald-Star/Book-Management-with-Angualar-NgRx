import { Injectable } from '@angular/core';
import { Book } from '../models/book'; // Import the Book model
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  // Simulate a book database with an array

  addBook(book: Book): Observable<Book> {
    return of(book); // Simulate adding a book by returning it as an observable
  }
}
