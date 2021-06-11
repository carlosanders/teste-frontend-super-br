import {CollectionViewer, DataSource as CollectionDataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';

export class DataSource<T> extends CollectionDataSource<T> {

    public constructor(private observable$: Observable<T[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.observable$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
