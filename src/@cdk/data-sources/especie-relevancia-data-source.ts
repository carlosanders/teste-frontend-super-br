import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieRelevancia} from '../models/especie-relevancia.model';

export class EspecieRelevanciaDataSource extends DataSource<EspecieRelevancia> {

    public constructor(private especieRelevancia$: Observable<EspecieRelevancia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieRelevancia[]> {
        return this.especieRelevancia$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
