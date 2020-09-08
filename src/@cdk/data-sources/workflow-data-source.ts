import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Workflow} from '@cdk/models';

export class WorkflowDataSource extends DataSource<Workflow> {

    public constructor(private workflows$: Observable<Workflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Workflow[]> {
        return this.workflows$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
