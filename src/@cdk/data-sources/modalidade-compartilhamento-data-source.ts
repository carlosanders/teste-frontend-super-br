import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeCompartilhamento} from '@cdk/models';

export class ModalidadeCompartilhamentoDataSource extends DataSource<ModalidadeCompartilhamento> {

    public constructor(private compartilhamentoes$: Observable<ModalidadeCompartilhamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeCompartilhamento[]> {
        return this.compartilhamentoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
