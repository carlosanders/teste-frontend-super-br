import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoAviso} from '../models';

export class VinculacaoAvisoDataSource extends DataSource<VinculacaoAviso> {

    public constructor(private VinculacaoAviso$: Observable<VinculacaoAviso[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoAviso[]> {
        return this.VinculacaoAviso$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
