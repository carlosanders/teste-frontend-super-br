import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Localizador} from '../models/localizador.model';

export class LocalizadorDataSource extends DataSource<Localizador> {

    public constructor(private localizador$: Observable<Localizador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Localizador[]> {
        return this.localizador$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
