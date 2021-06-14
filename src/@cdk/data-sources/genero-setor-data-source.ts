import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroSetor} from '../models';

export class GeneroSetorDataSource extends DataSource<GeneroSetor> {

    public constructor(private generoSetor$: Observable<GeneroSetor[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroSetor[]> {
        return this.generoSetor$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
