import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoTransicaoWorkflow} from '../models/vinculacao-transicao-workflow.model';

export class VinculacaoTransicaoWorkflowDataSource extends DataSource<VinculacaoTransicaoWorkflow> {

    public constructor(private list$: Observable<VinculacaoTransicaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoTransicaoWorkflow[]> {
        return this.list$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
