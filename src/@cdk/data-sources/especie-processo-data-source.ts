import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieProcesso} from '../models/especie-processo.model';

export class EspecieProcessoDataSource extends DataSource<EspecieProcesso> {

    public constructor(private especieProcesso$: Observable<EspecieProcesso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieProcesso[]> {
        return this.especieProcesso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
