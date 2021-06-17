import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeEtiqueta} from '@cdk/models';

export class ModalidadeEtiquetaDataSource extends DataSource<ModalidadeEtiqueta> {

    public constructor(private etiquetaes$: Observable<ModalidadeEtiqueta[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeEtiqueta[]> {
        return this.etiquetaes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
