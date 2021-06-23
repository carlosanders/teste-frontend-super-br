import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Compartilhamento} from '../models/compartilhamento.model';

export class CompartilhamentoDataSource extends DataSource<Compartilhamento> {

    public constructor(private assuntos$: Observable<Compartilhamento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Compartilhamento[]> {
        return this.assuntos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
