import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Afastamento} from '../models/afastamento.model';

export class AfastamentoDataSource extends DataSource<Afastamento> {

    public constructor(private afastamento$: Observable<Afastamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Afastamento[]> {
        return this.afastamento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
