import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Modulo} from '../models';

export class ModuloDataSource extends DataSource<Modulo> {

    public constructor(private modulo$: Observable<Modulo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Modulo[]> {
        return this.modulo$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
