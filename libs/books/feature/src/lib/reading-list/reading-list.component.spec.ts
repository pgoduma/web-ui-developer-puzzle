import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Remove Book from reading List', ()=>{
    it('Should remove book from reading list', ()=>{
      const app = fixture.debugElement.componentInstance;
      const removeSpy = jest.spyOn(app, 'removeFromReadingList').mockImplementation();
      app.removeFromReadingList();
      expect(removeSpy).toHaveBeenCalled();
    });
    it('should create a snackbar', () => {
      const app = fixture.debugElement.componentInstance;
      app.removeFromReadingList(createReadingListItem('A'));
      fixture.detectChanges();
      const snackBarDiv = document.querySelector('snack-bar-container');
      expect(snackBarDiv).toBeTruthy();
    });
    it('should be able to click Undo action on snackbar', () => {
      const app = fixture.debugElement.componentInstance;
      app.removeFromReadingList(createReadingListItem('A'));
      fixture.detectChanges();
      const snackBarActionButton = document.querySelector(
        'div.mat-simple-snackbar-action button'
      );
      const mouseEvent = new MouseEvent('click');
      snackBarActionButton.dispatchEvent(mouseEvent);
      const undoSpy = jest.spyOn(app, 'undoRemoveBookAction').mockImplementation();
      app.undoRemoveBookAction();
      fixture.detectChanges();
      expect(undoSpy).toHaveBeenCalled();
    });
  })
});
