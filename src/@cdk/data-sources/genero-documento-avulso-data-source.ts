import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroDocumentoAvulso} from '../models/genero-documento-avulso.model';

export class GeneroDocumentoAvulsoDataSource extends DataSource<GeneroDocumentoAvulso> {

    public constructor(private generoDocumentoAvulso$: Observable<GeneroDocumentoAvulso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroDocumentoAvulso[]> {
        return this.generoDocumentoAvulso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
