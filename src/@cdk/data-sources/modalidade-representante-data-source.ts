import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeRepresentante} from '@cdk/models';

export class ModalidadeRepresentanteDataSource extends DataSource<ModalidadeRepresentante> {

    public constructor(private representantees$: Observable<ModalidadeRepresentante[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeRepresentante[]> {
        return this.representantees$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
