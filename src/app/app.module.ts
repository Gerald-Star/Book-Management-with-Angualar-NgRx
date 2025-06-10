import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BookReducer } from './books/book.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ book: BookReducer }) // Register the BookReducer with the StoreModule, setting the NgRx store's root state to include the book state
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
