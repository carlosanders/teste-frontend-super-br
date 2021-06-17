import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {TipoSigilo} from '../models/tipo-sigilo.model';

export class TipoSigiloDataSource extends DataSource<TipoSigilo> {

    public constructor(private tipoSigilo$: Observable<TipoSigilo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<TipoSigilo[]> {
        return this.tipoSigilo$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
