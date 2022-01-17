import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoEspecieProcessoWorkflow} from '../models/vinculacao-especie-processo-workflow.model';

export class VinculacaoEspecieProcessoWorkflowDataSource extends DataSource<VinculacaoEspecieProcessoWorkflow> {

    public constructor(private list$: Observable<VinculacaoEspecieProcessoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoEspecieProcessoWorkflow[]> {
        return this.list$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
