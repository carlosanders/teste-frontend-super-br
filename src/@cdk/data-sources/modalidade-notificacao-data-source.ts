import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ModalidadeNotificacao } from '@cdk/models/modalidade-notificacao.model';

export class ModalidadeNotificacaoDataSource extends DataSource<ModalidadeNotificacao> {

    public constructor(private notificacaoes$: Observable<ModalidadeNotificacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeNotificacao[]> {
        return this.notificacaoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
