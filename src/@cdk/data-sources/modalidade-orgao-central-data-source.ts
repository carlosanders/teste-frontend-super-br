import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ModalidadeOrgaoCentral } from '@cdk/models/modalidade-orgao-central.model';

export class ModalidadeOrgaoCentralDataSource extends DataSource<ModalidadeOrgaoCentral> {

    public constructor(private orgaoCentrales$: Observable<ModalidadeOrgaoCentral[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeOrgaoCentral[]> {
        return this.orgaoCentrales$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
