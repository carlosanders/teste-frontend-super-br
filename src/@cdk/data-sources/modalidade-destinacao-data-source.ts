import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeDestinacao} from '@cdk/models';

export class ModalidadeDestinacaoDataSource extends DataSource<ModalidadeDestinacao> {

    public constructor(private assuntosAdministrativos$: Observable<ModalidadeDestinacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeDestinacao[]> {
        return this.assuntosAdministrativos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
