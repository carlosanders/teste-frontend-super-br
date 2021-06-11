import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeModelo} from '@cdk/models';

export class ModalidadeModeloDataSource extends DataSource<ModalidadeModelo> {

    public constructor(private modeloes$: Observable<ModalidadeModelo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeModelo[]> {
        return this.modeloes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
