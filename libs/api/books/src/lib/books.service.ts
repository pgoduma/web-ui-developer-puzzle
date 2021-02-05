import { HttpService, Injectable } from '@nestjs/common';
import { Book } from '@tmo/shared/models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpService) {}

  search(term: string): Observable<Book[]> {
    debugger;
    if (!term) {
      throw new Error('Missing search term');
    }

    return this.http
      .get(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
      .pipe(
        tap(resp => console.log),
        map(resp => resp.data.items.map(item => 
            ({
              id: item.id,
              title: item.volumeInfo?.title,
              authors: item.volumeInfo?.authors || [],
              description: item.searchInfo?.textSnippet,
              publisher: item.volumeInfo?.publisher,
              publishedDate: item.volumeInfo?.publishedDate
                ? new Date(item.volumeInfo?.publishedDate).toISOString()
                : undefined,
              coverUrl: item.volumeInfo?.imageLinks?.thumbnail
            } as Book)
          )
        )
      );
  }
}
