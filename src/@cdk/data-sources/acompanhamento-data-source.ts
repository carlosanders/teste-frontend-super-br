import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Compartilhamento} from '../models';

export class AcompanhamentoDataSource extends DataSource<Compartilhamento> {

    public constructor(private acompanhamento$: Observable<Compartilhamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Compartilhamento[]> {
        return this.acompanhamento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
