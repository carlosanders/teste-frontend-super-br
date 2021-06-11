import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeFase} from '@cdk/models';

export class ModalidadeFaseDataSource extends DataSource<ModalidadeFase> {

    public constructor(private fasees$: Observable<ModalidadeFase[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeFase[]> {
        return this.fasees$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
