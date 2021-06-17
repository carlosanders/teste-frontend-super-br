import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeMeio} from '@cdk/models';

export class ModalidadeMeio2DataSource extends DataSource<ModalidadeMeio> {

    public constructor(private meioes$: Observable<ModalidadeMeio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeMeio[]> {
        return this.meioes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
