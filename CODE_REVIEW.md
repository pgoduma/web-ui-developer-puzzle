**Layout Issues**
Not mobile responsive:
   - Book search results are not responsive when viewed in smaller screens.
   - Minor overlappng issue for reading list container element in mobile screens.


**Code Issues**
   - In book-search.component.ts, We can directly bind the response data from store to a locally created   observable and use async pipe in html to direcly display data. It is more declarative and reactive way of handling data.

   - In total-count.component.ts, We can remove empty ngOnInit method.

   - books-feature.module.ts, We can put all material components in a separate module and use then across different parts of application when needed.

  - In books.service.ts, We can remove the explicit return statements inside http get call for search method. We can directly return mapped results using arrow functions and typecast the each result item to Book.

  - Actions names could be given in a better way ex: AddToReadingListSuccessAction etc

  - In reading-list.reducer.ts the right actions should be 'confirmedAddToReadingList' and 'confirmedRemoveFromReadingList' instead of 'addToReadingList' and 'removeFromReadingList'.

  - A presentational and container components can be used for book display in book-search and reading-list components.

  - In reading-list.component.scss, the css can be nested for better readability. Right now they are separate without leveraging the use of scss.

  **Accessibility Issues**
    In book-search.component.html
     - 'alt' attribute is missing for images.
     - Want to Read Button doesn't have a aria-label to make it accessible for screen readers.
     - Book title, Authors, Publisher and Published Date doesnt have aria-labels to make them accessible for screen readers.
     - Icons are missing aria-labels.
     - Empty text message color should be more readable to the users. 

    In reading-list.component.html
     - 'alt' attribute is missing for images.
     - Close reading list drawer Button doesn't have a aria-label to make it accessible for screen readers.
     - Reading list book title and authors doesnt have aria-labels to make them accessible for screen readers.
     - Icons are missing aria-labels.
     - empty text is very light. 

    In total-count.component.html
     - Should include a matBadgeDescription for badge to describe its functionality.
     - Should include a hidden span with cdk-visually-hidden class to dynamically bind the count for screen readers.
   
    In app.component.html
    - Application title is missing aria-lable to make it to make it accessible for screen readers.
    - Reading List Button doesn't have a aria-label to make it accessible for screen readers.