import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Contato} from '@cdk/models/contato.model';

export class ContatoDataSource extends DataSource<Contato> {

    public constructor(private contato$: Observable<Contato[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Contato[]> {
        return this.contato$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
