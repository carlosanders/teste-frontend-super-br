import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Interessado} from '../models/interessado.model';

export class InteressadoDataSource extends DataSource<Interessado> {

    public constructor(private interessado$: Observable<Interessado[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Interessado[]> {
        return this.interessado$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
