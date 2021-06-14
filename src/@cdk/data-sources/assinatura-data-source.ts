import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Assinatura} from '../models/assinatura.model';

export class AssinaturaDataSource extends DataSource<Assinatura> {

    public constructor(private assinatura$: Observable<Assinatura[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Assinatura[]> {
        return this.assinatura$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
