import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoUsuario} from '../models/vinculacao-usuario.model';

export class VinculacaoUsuarioDataSource extends DataSource<VinculacaoUsuario> {

    public constructor(private vinculacaoUsuario$: Observable<VinculacaoUsuario[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoUsuario[]> {
        return this.vinculacaoUsuario$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
