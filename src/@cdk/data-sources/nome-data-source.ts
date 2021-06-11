import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Nome} from '../models/nome.model';

export class NomeDataSource extends DataSource<Nome> {

    public constructor(private nome$: Observable<Nome[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Nome[]> {
        return this.nome$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
