import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {ChatParticipante} from "../models";

export class ChatParticipanteDataSource extends DataSource<ChatParticipante> {

    public constructor(private chatParticipante$: Observable<ChatParticipante[]>) {
        super();
    }

    public connect(collectionViewer: CollectionViewer): Observable<ChatParticipante[]> {
        return this.chatParticipante$;
    }

    public disconnect(collectionViewer: CollectionViewer): void {
    }
}
