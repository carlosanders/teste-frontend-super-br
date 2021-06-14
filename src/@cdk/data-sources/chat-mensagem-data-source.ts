import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ChatMensagem} from "../models";

export class ChatMensagemDataSource extends DataSource<ChatMensagem> {

    public constructor(private chatMensagem$: Observable<ChatMensagem[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ChatMensagem[]> {
        return this.chatMensagem$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
