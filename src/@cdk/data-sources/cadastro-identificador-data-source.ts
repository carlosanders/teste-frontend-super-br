import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {CadastroIdentificador} from '../models/cadastro-identificador.model';

export class CadastroIdentificadorDataSource extends DataSource<CadastroIdentificador> {

    public constructor(private cadastroIdentificador$: Observable<CadastroIdentificador[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<CadastroIdentificador[]> {
        return this.cadastroIdentificador$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
