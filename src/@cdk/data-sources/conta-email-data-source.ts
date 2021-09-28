import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ContaEmail} from "../models/conta-email.model";

export class ContaEmailDataSource extends DataSource<ContaEmail> {

    public constructor(private contaEmail$: Observable<ContaEmail[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ContaEmail[]> {
        return this.contaEmail$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
