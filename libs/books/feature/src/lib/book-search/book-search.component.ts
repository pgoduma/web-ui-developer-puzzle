import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {

  searchForm = this.fb.group({
    term: ''
  });
  
  books$ = this.store.select(getAllBooks);
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    let snackBarRef = this.snackBar.open('Book added to Reading List', 'Undo', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      const item = {bookId: book.id} as ReadingListItem;
      this.store.dispatch(removeFromReadingList({ item }));
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchForm.value.term }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
