import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Classificacao} from '../models/classificacao.model';

export class ClassificacaoDataSource extends DataSource<Classificacao> {

    public constructor(private classificacoes$: Observable<Classificacao[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Classificacao[]> {
        return this.classificacoes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
