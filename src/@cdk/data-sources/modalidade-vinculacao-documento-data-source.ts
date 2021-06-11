import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeVinculacaoDocumento} from '@cdk/models';

export class ModalidadeVinculacaoDocumentoDataSource extends DataSource<ModalidadeVinculacaoDocumento> {

    public constructor(private vinculacaoDocumentoes$: Observable<ModalidadeVinculacaoDocumento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeVinculacaoDocumento[]> {
        return this.vinculacaoDocumentoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
