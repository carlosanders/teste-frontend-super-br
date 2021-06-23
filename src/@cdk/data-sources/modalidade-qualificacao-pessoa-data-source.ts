import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeQualificacaoPessoa} from '@cdk/models';

export class ModalidadeQualificacaoPessoaDataSource extends DataSource<ModalidadeQualificacaoPessoa> {

    public constructor(private qualificacaoPessoaes$: Observable<ModalidadeQualificacaoPessoa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeQualificacaoPessoa[]> {
        return this.qualificacaoPessoaes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
