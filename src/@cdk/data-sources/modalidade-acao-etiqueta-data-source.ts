import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeAcaoEtiqueta} from '../models/modalidade-acao-etiqueta.model';

export class ModalidadeAcaoEtiquetaDataSource extends DataSource<ModalidadeAcaoEtiqueta> {

    public constructor(private modalidadeAcaoEtiqueta$: Observable<ModalidadeAcaoEtiqueta[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeAcaoEtiqueta[]> {
        return this.modalidadeAcaoEtiqueta$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
