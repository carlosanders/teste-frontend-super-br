import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Transicao} from '../models/transicao.model';

export class TransicaoDataSource extends DataSource<Transicao> {

    public constructor(private transicao$: Observable<Transicao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Transicao[]> {
        return this.transicao$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
