import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoPessoaBarramento} from "../models/vinculacao-pessoa-barramento";

export class VinculacaoPessoaBarramentoDataSource extends DataSource<VinculacaoPessoaBarramento> {

    public constructor(private vincPessoaBarramento$: Observable<VinculacaoPessoaBarramento[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoPessoaBarramento[]> {
        return this.vincPessoaBarramento$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
