import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Lembrete} from '@cdk/models';

export class LembreteDataSource extends DataSource<Lembrete> {

    public constructor(private lembretes$: Observable<Lembrete[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Lembrete[]> {
        return this.lembretes$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
