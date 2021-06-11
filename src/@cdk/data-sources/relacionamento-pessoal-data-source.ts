import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {RelacionamentoPessoal} from '../models/relacionamento-pessoal.model';

export class RelacionamentoPessoalDataSource extends DataSource<RelacionamentoPessoal> {

    public constructor(private relacionamentoPessoal$: Observable<RelacionamentoPessoal[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<RelacionamentoPessoal[]> {
        return this.relacionamentoPessoal$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
