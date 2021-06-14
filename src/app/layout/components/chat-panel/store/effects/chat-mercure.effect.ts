import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs/operators';
import * as MercureActions from 'app/store/actions/mercure.action';
import {AddData} from '@cdk/ngrx-normalizr';
import {Chat, ChatMensagem, ChatParticipante} from '@cdk/models';
import {
    chat as chatSchema,
    chatMensagem as chatMensagemSchema,
    chatParticipante as chatParticipanteSchema
} from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {select, Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatUpdatedBroadcast, LimparMensagensNaoLidas, MensagemRecebida} from "../actions";
import {LoginService} from "../../../../../main/auth/login/login.service";
import {getChatOpen} from "../selectors";
import {ChatUtils} from "../../utils/chat.utils";

@Injectable()
export class ChatMercureEffects {

    /**
     * @param _actions
     * @param _store
     * @param _loginService
     * @param _chatUtils
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _chatUtils: ChatUtils
    ) {}

    getChatMercure: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<MercureActions.Message>(MercureActions.MESSAGE),
                withLatestFrom(this._store.pipe(select(getChatOpen))),
                tap(([action, chatOpen]): any => {
                    if (action.payload.type === 'addData') {
                        switch (action.payload.content['@type']) {
                            case 'ChatMensagem':
                                // Mensagem recebida
                                let chatMensagemClass = plainToClass(ChatMensagem, action.payload.content);
                                this._store.dispatch(new AddData<ChatMensagem>({data: [chatMensagemClass], schema: chatMensagemSchema}));
                                this._store.dispatch(new MensagemRecebida(chatMensagemClass));
                                break;
                            case 'Chat':
                                // Chat atualizado
                                let chatClass = plainToClass(Chat, action.payload.content);
                                this._store.dispatch(new AddData<Chat>({data: [chatClass], schema: chatSchema}));
                                this._store.dispatch(new ChatUpdatedBroadcast(chatClass));
                                if (!!chatOpen) {
                                    this._store.dispatch(new LimparMensagensNaoLidas(this._chatUtils.getParticipante(chatOpen.participantes)));
                                }
                                break;
                            case 'ChatParticipante':
                                // Foi iniciada uma nova conversa (individual/grupo) com o usuário
                                this._store.dispatch(new AddData<ChatParticipante>({data: [plainToClass(ChatParticipante, action.payload.content)], schema: chatParticipanteSchema}));
                                this._store.dispatch(new AddData<Chat>({data: [plainToClass(Chat, action.payload.content.chat)], schema: chatSchema}));
                                this._store.dispatch(new ChatUpdatedBroadcast(plainToClass(Chat, action.payload.content.chat)))
                                break;
                        }
                    }
                })
            );
    }, {dispatch: false})
}
