import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Usuario} from '../models/usuario.model';

export class UsuarioDataSource extends DataSource<Usuario> {

    public constructor(private assuntosAdministrativos$: Observable<Usuario[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Usuario[]> {
        return this.assuntosAdministrativos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
