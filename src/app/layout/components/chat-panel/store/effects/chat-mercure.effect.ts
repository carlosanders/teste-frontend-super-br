import {Injectable} from '@angular/core';
import {Effect, Actions, ofType, createEffect} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as MercureActions from 'app/store/actions/mercure.action';
import {Observable} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';
import {Chat, ChatMensagem, ChatParticipante} from '@cdk/models';
import {
    chat as chatSchema,
    chatMensagem as chatMensagemSchema,
    chatParticipante as chatParticipanteSchema
} from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {MensagemRecebida, NovoChatIniciado} from "../actions";

@Injectable()
export class ChatMercureEffects {

    /**
     * Constructor
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>
    ) {}

    getChatMercure: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<MercureActions.Message>(MercureActions.MESSAGE),
                tap((action): any => {
                    if (action.payload.type === 'addData') {
                        switch (action.payload.content['@type']) {
                            case 'ChatMensagem':
                                // Mensagem recebida
                                this._store.dispatch(new AddData<ChatMensagem>({data: [plainToClass(ChatMensagem, action.payload.content)], schema: chatMensagemSchema}));
                                this._store.dispatch(new MensagemRecebida(plainToClass(ChatMensagem, action.payload.content)))
                                break;
                            case 'Chat':
                                // Chat atualizado
                                this._store.dispatch(new AddData<Chat>({data: [plainToClass(Chat, action.payload.content)], schema: chatSchema}));
                                break;
                            case 'ChatParticipante':
                                // Foi iniciada uma nova conversa (individual/grupo) com o usuário
                                this._store.dispatch(new AddData<ChatParticipante>({data: [plainToClass(ChatParticipante, action.payload.content)], schema: chatParticipanteSchema}));
                                this._store.dispatch(new NovoChatIniciado(plainToClass(ChatParticipante, action.payload.content)))
                                break;
                        }
                    }
                })
            );
    }, {dispatch: false})
}
