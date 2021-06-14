import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Atividade} from '../models/atividade.model';

export class AtividadeDataSource extends DataSource<Atividade> {

    public constructor(private atividade$: Observable<Atividade[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Atividade[]> {
        return this.atividade$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
