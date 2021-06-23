import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroDocumento} from '../models/genero-documento.model';

export class GeneroDocumentoDataSource extends DataSource<GeneroDocumento> {

    public constructor(private generoDocumento$: Observable<GeneroDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroDocumento[]> {
        return this.generoDocumento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
