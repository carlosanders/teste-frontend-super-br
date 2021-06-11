import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoRole} from '../models/vinculacao-role.model';

export class VinculacaoRoleDataSource extends DataSource<VinculacaoRole> {

    public constructor(private vinculacaoRole$: Observable<VinculacaoRole[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoRole[]> {
        return this.vinculacaoRole$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
