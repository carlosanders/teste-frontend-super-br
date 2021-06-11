import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Municipio} from '@cdk/models';

export class MunicipioDataSource extends DataSource<Municipio> {

    public constructor(private municipios$: Observable<Municipio[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Municipio[]> {
        return this.municipios$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
