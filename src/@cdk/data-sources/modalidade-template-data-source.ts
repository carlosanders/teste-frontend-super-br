import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ModalidadeTemplate} from '@cdk/models';

export class ModalidadeTemplateDataSource extends DataSource<ModalidadeTemplate> {

    public constructor(private templatees$: Observable<ModalidadeTemplate[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ModalidadeTemplate[]> {
        return this.templatees$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
