import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Campo} from '@cdk/models';

export class CampoDataSource extends DataSource<Campo> {

    public constructor(private campos$: Observable<Campo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Campo[]> {
        return this.campos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
