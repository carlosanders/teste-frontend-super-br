import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ValidacaoTransicaoWorkflow} from '@cdk/models/validacao-transicao-workflow.model';

export class ValidacaoTransicaoWorkflowDataSource extends DataSource<ValidacaoTransicaoWorkflow> {

    public constructor(private validacoes$: Observable<ValidacaoTransicaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ValidacaoTransicaoWorkflow[]> {
        return this.validacoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
