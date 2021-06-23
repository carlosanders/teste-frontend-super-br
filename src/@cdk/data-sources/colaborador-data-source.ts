import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Colaborador} from '../models/colaborador.model';

export class ColaboradorDataSource extends DataSource<Colaborador> {

    public constructor(private colaborador$: Observable<Colaborador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Colaborador[]> {
        return this.colaborador$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
