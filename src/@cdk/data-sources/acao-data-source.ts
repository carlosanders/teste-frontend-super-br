import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Acao} from '@cdk/models';

export class AcaoDataSource extends DataSource<Acao> {

    public constructor(private acoes$: Observable<Acao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Acao[]> {
        return this.acoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
