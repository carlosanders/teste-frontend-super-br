import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoRepositorio} from '../models/vinculacao-repositorio.model';

export class VinculacaoRepositorioDataSource extends DataSource<VinculacaoRepositorio> {

    public constructor(private vinculacaoRepositorio$: Observable<VinculacaoRepositorio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoRepositorio[]> {
        return this.vinculacaoRepositorio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
