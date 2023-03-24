import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Navio} from '../models/navio.model';

export class NavioDataSource extends DataSource<Navio> {

    public constructor(private modeloes$: Observable<Navio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Navio[]> {
        return this.modeloes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
