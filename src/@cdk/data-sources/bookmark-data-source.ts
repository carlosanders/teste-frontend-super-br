import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Bookmark} from "../models/bookmark.model";

export class BookmarkDataSource extends DataSource<Bookmark> {

    public constructor(private bookmarks$: Observable<Bookmark[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Bookmark[]> {
        return this.bookmarks$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
