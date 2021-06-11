import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeColaborador} from '@cdk/models';

export class ModalidadeColaboradorDataSource extends DataSource<ModalidadeColaborador> {

    public constructor(private colaboradores$: Observable<ModalidadeColaborador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeColaborador[]> {
        return this.colaboradores$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
