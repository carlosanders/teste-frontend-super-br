import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ConfiguracaoNup} from '@cdk/models';

export class ConfiguracaoNupDataSource extends DataSource<ConfiguracaoNup> {

    public constructor(private configuracaoNup$: Observable<ConfiguracaoNup[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ConfiguracaoNup[]> {
        return this.configuracaoNup$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
