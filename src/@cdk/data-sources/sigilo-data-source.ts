import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Sigilo} from '../models/sigilo.model';

export class SigiloDataSource extends DataSource<Sigilo> {

    public constructor(private sigilo$: Observable<Sigilo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Sigilo[]> {
        return this.sigilo$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
