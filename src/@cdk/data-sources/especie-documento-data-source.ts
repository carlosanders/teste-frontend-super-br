import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieDocumento} from '../models/especie-documento.model';

export class EspecieDocumentoDataSource extends DataSource<EspecieDocumento> {

    public constructor(private especieDocumento$: Observable<EspecieDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieDocumento[]> {
        return this.especieDocumento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
