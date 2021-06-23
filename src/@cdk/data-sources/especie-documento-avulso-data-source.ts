import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieDocumentoAvulso} from '../models/especie-documento-avulso.model';

export class EspecieDocumentoAvulsoDataSource extends DataSource<EspecieDocumentoAvulso> {

    public constructor(private especieDocumentoAvulso$: Observable<EspecieDocumentoAvulso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieDocumentoAvulso[]> {
        return this.especieDocumentoAvulso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
