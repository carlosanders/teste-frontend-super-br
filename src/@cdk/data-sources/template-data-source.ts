import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Template} from '../models/template.model';

export class TemplateDataSource extends DataSource<Template> {

    public constructor(private template$: Observable<Template[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Template[]> {
        return this.template$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
