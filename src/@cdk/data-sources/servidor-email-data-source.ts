import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ServidorEmail} from "../models/servidor-email.model";

export class ServidorEmailDataSource extends DataSource<ServidorEmail> {

    public constructor(private servidorEmail$: Observable<ServidorEmail[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ServidorEmail[]> {
        return this.servidorEmail$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
