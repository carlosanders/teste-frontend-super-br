import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeVinculacaoProcesso} from '@cdk/models';

export class ModalidadeVinculacaoProcessoDataSource extends DataSource<ModalidadeVinculacaoProcesso> {

    public constructor(private vinculacaoProcessoes$: Observable<ModalidadeVinculacaoProcesso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeVinculacaoProcesso[]> {
        return this.vinculacaoProcessoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
