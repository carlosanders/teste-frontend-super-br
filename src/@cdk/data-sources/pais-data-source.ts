import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Pais} from '@cdk/models';

export class PaisDataSource extends DataSource<Pais> {

    public constructor(private paises$: Observable<Pais[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Pais[]> {
        return this.paises$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
