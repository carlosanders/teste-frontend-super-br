import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Relevancia} from '@cdk/models';

export class RelevanciaDataSource extends DataSource<Relevancia> {

    public constructor(private relevancia$: Observable<Relevancia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Relevancia[]> {
        return this.relevancia$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
