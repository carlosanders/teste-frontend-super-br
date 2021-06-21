import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {StatusBarramento} from '../models/status-barramento';


export class StatusBarramentoDataSource extends DataSource<StatusBarramento> {

    public constructor(private statusBarramento$: Observable<StatusBarramento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<StatusBarramento[]> {
        return this.statusBarramento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
