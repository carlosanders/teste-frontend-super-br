import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Role} from '../models/role.model';

export class RoleDataSource extends DataSource<Role> {

    public constructor(private role$: Observable<Role[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Role[]> {
        return this.role$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
