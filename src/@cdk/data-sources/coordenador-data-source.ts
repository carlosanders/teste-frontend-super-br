import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Coordenador} from '../models/coordenador.model';

export class CoordenadorDataSource extends DataSource<Coordenador> {

    public constructor(private coordenador$: Observable<Coordenador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Coordenador[]> {
        return this.coordenador$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
