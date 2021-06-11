import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Processo} from '@cdk/models';

export class ProcessoDataSource extends DataSource<Processo> {

    public constructor(private processos$: Observable<Processo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Processo[]> {
        return this.processos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
