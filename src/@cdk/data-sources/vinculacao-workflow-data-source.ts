import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoWorkflow} from '../models/vinculacao-workflow.model';

export class VinculacaoWorkflowDataSource extends DataSource<VinculacaoWorkflow> {

    public constructor(private list$: Observable<VinculacaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoWorkflow[]> {
        return this.list$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
