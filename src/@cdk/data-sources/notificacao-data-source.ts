import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Notificacao} from '../models/notificacao.model';

export class NotificacaoDataSource extends DataSource<Notificacao> {

    public constructor(private notificacao$: Observable<Notificacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Notificacao[]> {
        return this.notificacao$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
