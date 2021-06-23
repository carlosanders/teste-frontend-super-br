import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Etiqueta} from '@cdk/models';

export class EtiquetaDataSource extends DataSource<Etiqueta> {

    public constructor(private etiquetas$: Observable<Etiqueta[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Etiqueta[]> {
        return this.etiquetas$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
