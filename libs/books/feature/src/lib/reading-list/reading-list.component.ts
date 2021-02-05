import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { AppGlobal, Book, ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy{
  readingList$ = this.store.select(getReadingList);
  snackBarSub: Subscription;
  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    let snackBarRef = this.snackBar.open(AppGlobal.BOOK_REMOVED_MESSAGE, AppGlobal.UNDO, {
      duration: 3000
    });
    this.undoRemoveBookAction(snackBarRef, item);
  }
  undoRemoveBookAction(snackBarRef, item: ReadingListItem) {
    this.snackBarSub = snackBarRef.onAction().subscribe(() => {
      const book = {id: item.bookId, ...item} as Book;
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  ngOnDestroy() {
    this.snackBarSub.unsubscribe();
  }
}
