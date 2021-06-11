import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {LogEntry} from '../models/logentry.model';

export class LogEntryDataSource extends DataSource<LogEntry> {

    public constructor(private logentry$: Observable<LogEntry[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<LogEntry[]> {
        return this.logentry$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
