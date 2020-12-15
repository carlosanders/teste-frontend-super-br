import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {AcaoTransicaoWorkflow} from '@cdk/models/acao-transicao-workflow.model';

export class AcaoTransicaoWorkflowDataSource extends DataSource<AcaoTransicaoWorkflow> {

    public constructor(private acoes$: Observable<AcaoTransicaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<AcaoTransicaoWorkflow[]> {
        return this.acoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
