import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieRelatorio} from '../models/especie-relatorio.model';

export class EspecieRelatorioDataSource extends DataSource<EspecieRelatorio> {

    public constructor(private especieRelatorio$: Observable<EspecieRelatorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieRelatorio[]> {
        return this.especieRelatorio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
