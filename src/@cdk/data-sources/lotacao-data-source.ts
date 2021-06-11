import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Lotacao} from '../models/lotacao.model';

export class LotacaoDataSource extends DataSource<Lotacao> {

    public constructor(private lotacao$: Observable<Lotacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Lotacao[]> {
        return this.lotacao$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
