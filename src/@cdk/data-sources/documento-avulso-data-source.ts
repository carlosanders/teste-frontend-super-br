import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {DocumentoAvulso} from '../models/documento-avulso.model';

export class DocumentoAvulsoDataSource extends DataSource<DocumentoAvulso> {

    public constructor(private documentoAvulso$: Observable<DocumentoAvulso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<DocumentoAvulso[]> {
        return this.documentoAvulso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
