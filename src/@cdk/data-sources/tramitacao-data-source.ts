import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Tramitacao} from '../models/tramitacao.model';

export class TramitacaoDataSource extends DataSource<Tramitacao> {

    public constructor(private tramitacao$: Observable<Tramitacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Tramitacao[]> {
        return this.tramitacao$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
