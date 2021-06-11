import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Distribuicao} from '../models/distribuicao.model';

export class DistribuicaoDataSource extends DataSource<Distribuicao> {

    public constructor(private distribuicao$: Observable<Distribuicao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Distribuicao[]> {
        return this.distribuicao$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
