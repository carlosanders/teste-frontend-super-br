import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoValidacaoWorkflow} from '../models/tipo-validacao-workflow.model';

export class TipoValidacaoWorkflowDataSource extends DataSource<TipoValidacaoWorkflow> {

    public constructor(private tipoValidacaoWorkflow$: Observable<TipoValidacaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoValidacaoWorkflow[]> {
        return this.tipoValidacaoWorkflow$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
