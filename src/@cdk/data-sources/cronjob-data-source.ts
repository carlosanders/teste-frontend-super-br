import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Cronjob} from '@cdk/models';
import {Observable} from 'rxjs';

export class CronjobDataSource extends DataSource<Cronjob> {

    public constructor(private cronjobs$: Observable<Cronjob[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Cronjob[]> {
        return this.cronjobs$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
