import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoNotificacao} from '@cdk/models';

export class TipoNotificacaoDataSource extends DataSource<TipoNotificacao> {

    public constructor(private notificacaoes$: Observable<TipoNotificacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoNotificacao[]> {
        return this.notificacaoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
