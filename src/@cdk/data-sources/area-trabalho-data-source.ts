import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {AreaTrabalho} from '../models/area-trabalho.model';

export class AreaTrabalhoDataSource extends DataSource<AreaTrabalho> {

    public constructor(private areasTrabalho$: Observable<AreaTrabalho[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<AreaTrabalho[]> {
        return this.areasTrabalho$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
