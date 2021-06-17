import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Aviso} from '@cdk/models';

export class AvisoDataSource extends DataSource<Aviso> {

    public constructor(private avisos$: Observable<Aviso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Aviso[]> {
        return this.avisos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
