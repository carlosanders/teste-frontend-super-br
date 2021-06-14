import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoEtiqueta} from '../models/vinculacao-etiqueta.model';

export class VinculacaoEtiquetaDataSource extends DataSource<VinculacaoEtiqueta> {

    public constructor(private vinculacaoEtiqueta$: Observable<VinculacaoEtiqueta[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoEtiqueta[]> {
        return this.vinculacaoEtiqueta$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
