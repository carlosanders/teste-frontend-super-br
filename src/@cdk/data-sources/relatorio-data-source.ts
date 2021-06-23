import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Relatorio} from '../models/relatorio.model';

export class RelatorioDataSource extends DataSource<Relatorio> {

    public constructor(private relatorio$: Observable<Relatorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Relatorio[]> {
        return this.relatorio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
