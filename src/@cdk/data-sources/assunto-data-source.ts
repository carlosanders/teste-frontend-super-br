import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Assunto} from '@cdk/models';
import {Observable} from 'rxjs';

export class AssuntoDataSource extends DataSource<Assunto> {

    public constructor(private assuntos$: Observable<Assunto[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Assunto[]> {
        return this.assuntos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
