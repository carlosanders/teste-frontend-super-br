import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {VinculacaoSetorMunicipio} from '../models/vinculacao-setor-municipio.model';

export class VinculacaoSetorMunicipioDataSource extends DataSource<VinculacaoSetorMunicipio> {

    public constructor(private vinculacaoSetorMunicipio$: Observable<VinculacaoSetorMunicipio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<VinculacaoSetorMunicipio[]> {
        return this.vinculacaoSetorMunicipio$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
