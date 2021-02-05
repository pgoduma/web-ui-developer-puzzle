import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook,createReadingListItem,SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('Add Book to reading List', ()=>{
    it('Should add book to reading list', ()=>{
      const app = fixture.debugElement.componentInstance;
      const searchExample = fixture.nativeElement.querySelector('#searchExample');
      searchExample.click();
      fixture.detectChanges();
      const addSpy = jest.spyOn(app, 'addBookToReadingList').mockImplementation();
      app.addBookToReadingList();
      expect(addSpy).toHaveBeenCalled();
    });
    it('should create a snackbar', () => {
      const app = fixture.debugElement.componentInstance;
      app.addBookToReadingList(createReadingListItem('A'));
      fixture.detectChanges();
      const snackBar = document.querySelector('snack-bar-container');
      expect(snackBar).toBeTruthy();
    });
    it('should be able to click Undo action on snackbar', () => {
      const app = fixture.debugElement.componentInstance;
      app.addBookToReadingList(createReadingListItem('A'));
      fixture.detectChanges();
      const snackBarActionButton = document.querySelector(
        'div.mat-simple-snackbar-action button'
      );
      const mouseEvent = new MouseEvent('click');
      snackBarActionButton.dispatchEvent(mouseEvent);
      const undoSpy = jest.spyOn(app, 'undoAddAction').mockImplementation();
      app.undoAddAction();
      fixture.detectChanges();
      expect(undoSpy).toHaveBeenCalled();
    });
  })
});
