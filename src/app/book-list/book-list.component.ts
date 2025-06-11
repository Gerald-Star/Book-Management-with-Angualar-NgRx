import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { AddBook, RemoveBook } from '../books/book.actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  // Define the observable for books
  books$: Observable<Book[]>  // You add this under constructor or attach it here = this.store.pipe(select('books'));


  constructor(private store: Store<{ books: Book[] }>) {
    this.books$ = this.store.pipe(select('books'));
    
  }

  addBook(id: string, title: string, author: string, publishedDate: string, genre: string, summary: string, rating: number, isAvailable: boolean) {
    const newBook: Book = {
      id,
      title,
      author,
      publishedDate,
      genre,
      summary,
      rating,
      isAvailable
    };
    this.store.dispatch(AddBook({id, title, author, publishedDate, genre, summary, rating, isAvailable}));
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }));
  }
}
