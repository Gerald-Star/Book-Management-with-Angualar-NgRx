# BookManagement

## ng generate interface models/book

## How to create components, models. service and interface and their purpose

## What does ng generate mean / example app.state

## Change to AppState
export interface AppState {
  book: ReturnType<typeof BookReducer>;
}