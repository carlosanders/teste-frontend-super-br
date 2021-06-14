import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeGeneroPessoa} from '@cdk/models';

export class ModalidadeGeneroPessoaDataSource extends DataSource<ModalidadeGeneroPessoa> {

    public constructor(private generoPessoaes$: Observable<ModalidadeGeneroPessoa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeGeneroPessoa[]> {
        return this.generoPessoaes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
