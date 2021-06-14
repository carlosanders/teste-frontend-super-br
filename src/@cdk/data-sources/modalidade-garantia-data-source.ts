import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeGarantia} from '@cdk/models';

export class ModalidadeGarantiaDataSource extends DataSource<ModalidadeGarantia> {

    public constructor(private garantias$: Observable<ModalidadeGarantia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeGarantia[]> {
        return this.garantias$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
