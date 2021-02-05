import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem, AppGlobal } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnDestroy{

  searchForm = this.fb.group({
    term: ''
  });
  snackBarSub: Subscription;
  books$ = this.store.select(getAllBooks);
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    let snackBarRef = this.snackBar.open(AppGlobal.BOOK_ADDED_MESSAGE, AppGlobal.UNDO, {
      duration: 3000
    });
    this.undoAddAction(snackBarRef, book);
  }
  undoAddAction(snackBarRef, book: Book) {
    this.snackBarSub = snackBarRef.onAction().subscribe(() => {
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
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(){
    this.snackBarSub.unsubscribe();
  }

}
