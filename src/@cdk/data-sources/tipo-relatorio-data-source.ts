import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

export class TipoRelatorioDataSource extends DataSource<TipoRelatorio> {

    public constructor(private tiposRelatorios$: Observable<TipoRelatorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoRelatorio[]> {
        return this.tiposRelatorios$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
