import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {OrigemDados} from '../models/origem-dados.model';

export class OrigemDadosDataSource extends DataSource<OrigemDados> {

    public constructor(private origemDados$: Observable<OrigemDados[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<OrigemDados[]> {
        return this.origemDados$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
