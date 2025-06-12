import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BookReducer } from './books/book.reducer';
import { AppState } from './app.state'; // Import the AppState interface
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './books/book.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Import DevtoolsModule for debugging purposes
;


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState> ({book: BookReducer }),// Register the BookReducer with the StoreModule, setting the NgRx store's root state to include the book state
    EffectsModule.forRoot([BookEffects]), // Register the effects module, currently no effects are defined
    StoreDevtoolsModule.instrument() // Enable the Store Devtools for debugging, keeping the last 25 states
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
