import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {AssuntoAdministrativo} from '@cdk/models';

export class AssuntoAdministrativoDataSource extends DataSource<AssuntoAdministrativo> {

    public constructor(private assuntosAdministrativos$: Observable<AssuntoAdministrativo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<AssuntoAdministrativo[]> {
        return this.assuntosAdministrativos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
