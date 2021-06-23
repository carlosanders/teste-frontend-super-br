import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {DocumentoIdentificador} from '../models/documento-identificador.model';

export class DocumentoIdentificadorDataSource extends DataSource<DocumentoIdentificador> {

    public constructor(private documentoIdentificador$: Observable<DocumentoIdentificador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<DocumentoIdentificador[]> {
        return this.documentoIdentificador$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
