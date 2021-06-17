import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoPessoaUsuario} from '../models';


export class VinculacaoPessoaUsuarioDataSource extends DataSource<VinculacaoPessoaUsuario> {

    public constructor(private vinculacaoPessoaUsuario$: Observable<VinculacaoPessoaUsuario[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoPessoaUsuario[]> {
        return this.vinculacaoPessoaUsuario$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
