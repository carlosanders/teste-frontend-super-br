import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Feriado} from '../models/feriado.model';

export class FeriadoDataSource extends DataSource<Feriado> {

    public constructor(private feriado$: Observable<Feriado[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Feriado[]> {
        return this.feriado$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
