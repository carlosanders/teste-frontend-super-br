import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Repositorio} from '@cdk/models';

export class RepositorioDataSource extends DataSource<Repositorio> {

    public constructor(private repositorio$: Observable<Repositorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Repositorio[]> {
        return this.repositorio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
