import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Juntada} from '../models/juntada.model';

export class JuntadaDataSource extends DataSource<Juntada> {

    public constructor(private juntada$: Observable<Juntada[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Juntada[]> {
        return this.juntada$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
