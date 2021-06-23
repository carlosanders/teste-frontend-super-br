import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ComponenteDigital} from '@cdk/models';
import {Observable} from 'rxjs';

export class ComponenteDigitalDataSource extends DataSource<ComponenteDigital> {

    public constructor(private componentesDigitais$: Observable<ComponenteDigital[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ComponenteDigital[]> {
        return this.componentesDigitais$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
