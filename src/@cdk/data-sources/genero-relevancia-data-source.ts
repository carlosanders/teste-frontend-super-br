import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroRelevancia} from '../models/genero-relevancia.model';

export class GeneroRelevanciaDataSource extends DataSource<GeneroRelevancia> {

    public constructor(private generoRelevancia$: Observable<GeneroRelevancia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroRelevancia[]> {
        return this.generoRelevancia$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
