import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Endereco} from '@cdk/models';

export class EnderecoDataSource extends DataSource<Endereco> {

    public constructor(private enderecos$: Observable<Endereco[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Endereco[]> {
        return this.enderecos$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
