import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeFolder} from '@cdk/models';

export class ModalidadeFolderDataSource extends DataSource<ModalidadeFolder> {

    public constructor(private folderes$: Observable<ModalidadeFolder[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeFolder[]> {
        return this.folderes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
