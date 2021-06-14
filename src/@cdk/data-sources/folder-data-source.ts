import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Folder} from '../models/folder.model';

export class FolderDataSource extends DataSource<Folder> {

    public constructor(private folder$: Observable<Folder[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Folder[]> {
        return this.folder$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
