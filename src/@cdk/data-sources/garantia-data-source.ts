import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Garantia } from '@cdk/models/garantia.model';
import { Observable } from 'rxjs';

export class GarantiaDataSource extends DataSource<Garantia> {

    public constructor(private garantias$: Observable<Garantia[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Garantia[]> {
        return this.garantias$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
