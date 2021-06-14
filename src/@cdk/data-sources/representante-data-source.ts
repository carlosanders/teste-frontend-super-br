import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Representante} from '@cdk/models';

export class RepresentanteDataSource extends DataSource<Representante> {

    public constructor(private representante$: Observable<Representante[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Representante[]> {
        return this.representante$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
