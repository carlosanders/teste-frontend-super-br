import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeDocumentoIdentificador} from '../models/modalidade-documento-identificador.model';

export class ModalidadeDocumentoIdentificadorDataSource extends DataSource<ModalidadeDocumentoIdentificador> {

    public constructor(private documentoIdentificadors$: Observable<ModalidadeDocumentoIdentificador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeDocumentoIdentificador[]> {
        return this.documentoIdentificadors$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
