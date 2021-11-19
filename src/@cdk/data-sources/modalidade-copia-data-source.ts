import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeCopia} from '@cdk/models';

export class ModalidadeCopiaDataSource extends DataSource<ModalidadeCopia> {

    public constructor(private modalidadesCopias$: Observable<ModalidadeCopia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeCopia[]> {
        return this.modalidadesCopias$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
