import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Regra} from '@cdk/models';

export class RegraDataSource extends DataSource<Regra> {

    public constructor(private regras$: Observable<Regra[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Regra[]> {
        return this.regras$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
