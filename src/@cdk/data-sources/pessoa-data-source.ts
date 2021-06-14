import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Pessoa} from '@cdk/models';

export class PessoaDataSource extends DataSource<Pessoa> {

    public constructor(private pessoas$: Observable<Pessoa[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Pessoa[]> {
        return this.pessoas$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
