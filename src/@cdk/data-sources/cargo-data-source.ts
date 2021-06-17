import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Cargo} from '@cdk/models';

export class CargoDataSource extends DataSource<Cargo> {

    public constructor(private cargos$: Observable<Cargo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Cargo[]> {
        return this.cargos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
