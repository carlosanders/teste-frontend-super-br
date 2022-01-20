import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ObjetoAvaliado} from '@cdk/models';

export class ObjetoAvaliadoDataSource extends DataSource<ObjetoAvaliado> {

    public constructor(private objetosAvaliados$: Observable<ObjetoAvaliado[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ObjetoAvaliado[]> {
        return this.objetosAvaliados$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
