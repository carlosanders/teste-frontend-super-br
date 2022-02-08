import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Avaliacao} from '@cdk/models';

export class AvaliacaoDataSource extends DataSource<Avaliacao> {

    public constructor(private avaliacoes$: Observable<Avaliacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Avaliacao[]> {
        return this.avaliacoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
