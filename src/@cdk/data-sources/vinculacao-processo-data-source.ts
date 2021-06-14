import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoProcesso} from '../models/vinculacao-processo.model';

export class VinculacaoProcessoDataSource extends DataSource<VinculacaoProcesso> {

    public constructor(private vinculacaoProcesso$: Observable<VinculacaoProcesso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoProcesso[]> {
        return this.vinculacaoProcesso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
