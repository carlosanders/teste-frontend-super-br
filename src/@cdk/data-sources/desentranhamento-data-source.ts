import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Desentranhamento} from '../models/desentranhamento.model';

export class DesentranhamentoDataSource extends DataSource<Desentranhamento> {

    public constructor(private desentranhamento$: Observable<Desentranhamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Desentranhamento[]> {
        return this.desentranhamento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
