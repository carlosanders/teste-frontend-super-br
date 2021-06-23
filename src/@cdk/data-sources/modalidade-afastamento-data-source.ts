import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeAfastamento} from '@cdk/models';

export class ModalidadeAfastamentoDataSource extends DataSource<ModalidadeAfastamento> {

    public constructor(private assuntosAdministrativos$: Observable<ModalidadeAfastamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeAfastamento[]> {
        return this.assuntosAdministrativos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
