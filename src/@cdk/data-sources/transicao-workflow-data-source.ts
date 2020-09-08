import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TransicaoWorkflow} from '@cdk/models';

export class TransicaoWorkflowDataSource extends DataSource<TransicaoWorkflow> {

    public constructor(private transicoesWorkflows$: Observable<TransicaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TransicaoWorkflow[]> {
        return this.transicoesWorkflows$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
