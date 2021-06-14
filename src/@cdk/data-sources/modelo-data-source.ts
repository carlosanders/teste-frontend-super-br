import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Modelo} from '@cdk/models';

export class ModeloDataSource extends DataSource<Modelo> {

    public constructor(private modelos$: Observable<Modelo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Modelo[]> {
        return this.modelos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
