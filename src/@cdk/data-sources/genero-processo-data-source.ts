import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroProcesso} from '../models/genero-processo.model';

export class GeneroProcessoDataSource extends DataSource<GeneroProcesso> {

    public constructor(private generoProcesso$: Observable<GeneroProcesso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroProcesso[]> {
        return this.generoProcesso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
