import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeRelacionamentoPessoal} from '@cdk/models';

export class ModalidadeRelacionamentoPessoalDataSource extends DataSource<ModalidadeRelacionamentoPessoal> {

    public constructor(private relacionamentoPessoales$: Observable<ModalidadeRelacionamentoPessoal[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeRelacionamentoPessoal[]> {
        return this.relacionamentoPessoales$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
