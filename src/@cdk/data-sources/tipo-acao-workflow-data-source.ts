import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoAcaoWorkflow} from '../models/tipo-acao-workflow.model';

export class TipoAcaoWorkflowDataSource extends DataSource<TipoAcaoWorkflow> {

    public constructor(private tipoAcaoWorkflow$: Observable<TipoAcaoWorkflow[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoAcaoWorkflow[]> {
        return this.tipoAcaoWorkflow$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
