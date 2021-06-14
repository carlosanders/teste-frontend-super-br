import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Favorito} from '../models/favorito.model';

export class FavoritoDataSource extends DataSource<Favorito> {

    public constructor(private favorito$: Observable<Favorito[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Favorito[]> {
        return this.favorito$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
