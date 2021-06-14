import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieSetor} from '../models/especie-setor.model';

export class EspecieSetorDataSource extends DataSource<EspecieSetor> {

    public constructor(private especieSetor$: Observable<EspecieSetor[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieSetor[]> {
        return this.especieSetor$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
