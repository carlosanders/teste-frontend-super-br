import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GrupoContato} from '@cdk/models/grupo-contato.model';

export class GrupoContatoDataSource extends DataSource<GrupoContato> {

    public constructor(private grupoContato$: Observable<GrupoContato[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GrupoContato[]> {
        return this.grupoContato$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
