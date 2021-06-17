import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoContato} from '@cdk/models/tipo-contato.model';

export class TipoContatoDataSource extends DataSource<TipoContato> {

    public constructor(private tipoContato$: Observable<TipoContato[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoContato[]> {
        return this.tipoContato$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
