import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeTransicao} from '@cdk/models';

export class ModalidadeTransicaoDataSource extends DataSource<ModalidadeTransicao> {

    public constructor(private transicaoes$: Observable<ModalidadeTransicao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeTransicao[]> {
        return this.transicaoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
