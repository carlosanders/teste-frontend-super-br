import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeAlvoInibidor} from '../models/modalidade-alvo-inibidor.model';

export class ModalidadeAlvoInibidorDataSource extends DataSource<ModalidadeAlvoInibidor> {

    public constructor(private alvosInibidores$: Observable<ModalidadeAlvoInibidor[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeAlvoInibidor[]> {
        return this.alvosInibidores$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
