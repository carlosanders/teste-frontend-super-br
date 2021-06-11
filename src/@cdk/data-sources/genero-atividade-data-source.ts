import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroAtividade} from '../models/genero-atividade.model';

export class GeneroAtividadeDataSource extends DataSource<GeneroAtividade> {

    public constructor(private generoAtividade$: Observable<GeneroAtividade[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroAtividade[]> {
        return this.generoAtividade$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
