import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoDocumento} from '@cdk/models';

export class TipoDocumentoDataSource extends DataSource<TipoDocumento> {

    public constructor(private tiposDocumentos$: Observable<TipoDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoDocumento[]> {
        return this.tiposDocumentos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
