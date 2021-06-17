import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Historico} from '../models/historico.model';

export class HistoricoDataSource extends DataSource<Historico> {

    public constructor(private historico$: Observable<Historico[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Historico[]> {
        return this.historico$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
