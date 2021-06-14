import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Chat} from "../models";

export class ChatDataSource extends DataSource<Chat> {

    public constructor(private chat$: Observable<Chat[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<Chat[]> {
        return this.chat$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
