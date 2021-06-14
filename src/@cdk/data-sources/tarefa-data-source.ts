import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Tarefa} from '../models/tarefa.model';

export class TarefaDataSource extends DataSource<Tarefa> {

    public constructor(private tarefa$: Observable<Tarefa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Tarefa[]> {
        return this.tarefa$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
