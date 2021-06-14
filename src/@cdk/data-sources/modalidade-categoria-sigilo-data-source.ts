import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeCategoriaSigilo} from '../models/modalidade-categoria-sigilo.model';

export class ModalidadeCategoriaSigiloDataSource extends DataSource<ModalidadeCategoriaSigilo> {

    public constructor(private categoriaSigilos$: Observable<ModalidadeCategoriaSigilo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeCategoriaSigilo[]> {
        return this.categoriaSigilos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
