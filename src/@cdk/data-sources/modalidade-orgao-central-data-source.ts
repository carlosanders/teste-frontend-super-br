import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeOrgaoCentral} from '@cdk/models';

export class ModalidadeOrgaoCentralDataSource extends DataSource<ModalidadeOrgaoCentral> {

    public constructor(private modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeOrgaoCentral[]> {
        return this.modalidadeOrgaoCentral$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
