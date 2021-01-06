import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {RegraEtiqueta} from '@cdk/models';

export class RegraEtiquetaDataSource extends DataSource<RegraEtiqueta> {

    public constructor(private regras$: Observable<RegraEtiqueta[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<RegraEtiqueta[]> {
        return this.regras$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
