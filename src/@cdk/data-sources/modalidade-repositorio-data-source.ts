import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ModalidadeRepositorio } from '@cdk/models/modalidade-repositorio.model';

export class ModalidadeRepositorioDataSource extends DataSource<ModalidadeRepositorio> {

    public constructor(private repositorioes$: Observable<ModalidadeRepositorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeRepositorio[]> {
        return this.repositorioes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
