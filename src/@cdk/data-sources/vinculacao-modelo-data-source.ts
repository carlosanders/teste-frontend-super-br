import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoModelo} from '../models/vinculacao-modelo.model';

export class VinculacaoModeloDataSource extends DataSource<VinculacaoModelo> {

    public constructor(private vinculacaoModelo$: Observable<VinculacaoModelo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoModelo[]> {
        return this.vinculacaoModelo$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
