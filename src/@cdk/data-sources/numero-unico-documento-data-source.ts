import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {NumeroUnicoDocumento} from '../models';

export class NumeroUnicoDocumentoDataSource extends DataSource<NumeroUnicoDocumento> {

    public constructor(private numeroUnicoDocumento$: Observable<NumeroUnicoDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<NumeroUnicoDocumento[]> {
        return this.numeroUnicoDocumento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
