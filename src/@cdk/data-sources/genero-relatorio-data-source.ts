import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroRelatorio} from '../models/genero-relatorio.model';

export class GeneroRelatorioDataSource extends DataSource<GeneroRelatorio> {

    public constructor(private generoRelatorio$: Observable<GeneroRelatorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroRelatorio[]> {
        return this.generoRelatorio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
