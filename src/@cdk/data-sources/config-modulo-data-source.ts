import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ConfigModulo} from '../models';

export class ConfigModuloDataSource extends DataSource<ConfigModulo> {

    public constructor(private ConfigModuleModel$: Observable<ConfigModulo[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ConfigModulo[]> {
        return this.ConfigModuleModel$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
