import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { VinculacaoOrgaoCentralUsuario } from '../models/vinculacao-orgao-central-usuario.model';

export class VinculacaoOrgaoCentralUsuarioDataSource extends DataSource<VinculacaoOrgaoCentralUsuario> {

    public constructor(private vinculacaoOrgaoCentralUsuario$: Observable<VinculacaoOrgaoCentralUsuario[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoOrgaoCentralUsuario[]> {
        return this.vinculacaoOrgaoCentralUsuario$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
