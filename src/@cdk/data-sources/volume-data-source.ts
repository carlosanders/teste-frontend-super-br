import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Volume} from '../models/volume.model';

export class VolumeDataSource extends DataSource<Volume> {

    public constructor(private volume$: Observable<Volume[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Volume[]> {
        return this.volume$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
