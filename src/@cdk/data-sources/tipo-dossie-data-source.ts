import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoDossie} from '@cdk/models/tipo-dossie.model';

export class TipoDossieDataSource extends DataSource<TipoDossie> {

    public constructor(private tiposDossie$: Observable<TipoDossie[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoDossie[]> {
        return this.tiposDossie$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
