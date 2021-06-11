import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieAtividade} from '../models/especie-atividade.model';

export class EspecieAtividadeDataSource extends DataSource<EspecieAtividade> {

    public constructor(private especieAtividade$: Observable<EspecieAtividade[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieAtividade[]> {
        return this.especieAtividade$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
