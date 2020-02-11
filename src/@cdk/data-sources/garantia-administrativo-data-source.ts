import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { GarantiaAdministrativo } from '@cdk/models/garantia-administrativo.model';

export class GarantiaAdministrativoDataSource extends DataSource<GarantiaAdministrativo> {

    public constructor(private garantiasAdministrativos$: Observable<GarantiaAdministrativo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GarantiaAdministrativo[]> {
        return this.garantiasAdministrativos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
