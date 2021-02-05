import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit{

  searchForm = this.fb.group({
    term: ''
  });
  
  books$ = this.store.select(getAllBooks);
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(){
    this.searchForm.controls.term.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((query) => {
         return of(query);
        })
        ).subscribe((text:string) => {
        let searchQuery = text.replace(/^\s+|\s+$/g, ''); //remove leading and trailing whitespace
        this.searchBooks(searchQuery);
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
  }

  searchBooks(query: string) {
    if ( query ) {
      this.store.dispatch(searchBooks({ term: query }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
