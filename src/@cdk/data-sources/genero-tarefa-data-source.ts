import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {GeneroTarefa} from '../models/genero-tarefa.model';

export class GeneroTarefaDataSource extends DataSource<GeneroTarefa> {

    public constructor(private generoTarefa$: Observable<GeneroTarefa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<GeneroTarefa[]> {
        return this.generoTarefa$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
