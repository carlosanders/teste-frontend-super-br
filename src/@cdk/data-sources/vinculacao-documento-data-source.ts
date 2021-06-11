import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoDocumento} from '../models/vinculacao-documento.model';

export class VinculacaoDocumentoDataSource extends DataSource<VinculacaoDocumento> {

    public constructor(private vinculacaoDocumento$: Observable<VinculacaoDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoDocumento[]> {
        return this.vinculacaoDocumento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
