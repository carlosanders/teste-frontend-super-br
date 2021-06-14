import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Documento} from '@cdk/models';
import {Observable} from 'rxjs';

export class DocumentoDataSource extends DataSource<Documento> {

    public constructor(private documentos$: Observable<Documento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Documento[]> {
        return this.documentos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
