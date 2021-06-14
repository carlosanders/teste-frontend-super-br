import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Setor} from '@cdk/models';

export class SetorDataSource extends DataSource<Setor> {

    public constructor(private setores$: Observable<Setor[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Setor[]> {
        return this.setores$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
