import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {EspecieTarefa} from '../models/especie-tarefa.model';

export class EspecieTarefaDataSource extends DataSource<EspecieTarefa> {

    public constructor(private especieTarefa$: Observable<EspecieTarefa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<EspecieTarefa[]> {
        return this.especieTarefa$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
