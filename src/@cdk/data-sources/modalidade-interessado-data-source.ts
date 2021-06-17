import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeInteressado} from '@cdk/models';

export class ModalidadeInteressadoDataSource extends DataSource<ModalidadeInteressado> {

    public constructor(private interessadoes$: Observable<ModalidadeInteressado[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeInteressado[]> {
        return this.interessadoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
