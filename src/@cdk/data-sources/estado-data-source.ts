import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Estado} from '@cdk/models';

export class EstadoDataSource extends DataSource<Estado> {

    public constructor(private estados$: Observable<Estado[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Estado[]> {
        return this.estados$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
