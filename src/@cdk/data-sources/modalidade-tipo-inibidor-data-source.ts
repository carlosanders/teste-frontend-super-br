import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeTipoInibidor} from '@cdk/models';

export class ModalidadeTipoInibidorDataSource extends DataSource<ModalidadeTipoInibidor> {

    public constructor(private tipoInibidores$: Observable<ModalidadeTipoInibidor[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeTipoInibidor[]> {
        return this.tipoInibidores$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
