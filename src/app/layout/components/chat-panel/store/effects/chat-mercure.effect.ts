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
import * as fromStore  from "../";
import {LoginService} from "../../../../../main/auth/login/login.service";

@Injectable()
export class ChatMercureEffects {

    /**
     * @param _actions
     * @param _store
     * @param _loginService
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _loginService: LoginService
    ) {}

    getChatMercure: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<MercureActions.Message>(MercureActions.MESSAGE),
                withLatestFrom(this._store.pipe(select(fromStore.getChatOpen))),
                tap(([action, chatOpen]): any => {
                    if (action.payload.type === 'addData') {
                        switch (action.payload.content['@type']) {
                            case 'ChatMensagem':
                                let chatMensagemClass = plainToClass(ChatMensagem, action.payload.content);
                                this._store.dispatch(new AddData<ChatMensagem>({data: [chatMensagemClass], schema: chatMensagemSchema}));
                                this._store.dispatch(new fromStore.MensagemRecebida(chatMensagemClass));

                                // Sempre que receber uma mensagem de outro usuário e o chat estiver aberto marca como lida
                                if (!!chatOpen && chatMensagemClass.usuario.id !== this._loginService.getUserProfile()?.id) {
                                    this._store.dispatch(new fromStore.LimparMensagensNaoLidas({
                                        chat: chatOpen,
                                        populate: [
                                            'chat',
                                            'chat.ultimaMensagem',
                                            'chat.capa',
                                        ],
                                        context: {
                                            'chat_participante': this._loginService.getUserProfile()?.id,
                                            'chat_individual_usuario': this._loginService.getUserProfile()?.id,
                                        }
                                    }));
                                }
                                break;
                            case 'Chat':
                                // Chat atualizado
                                const chatClass = plainToClass(Chat, action.payload.content);
                                this._store.dispatch(new AddData<Chat>({data: [chatClass], schema: chatSchema}));
                                this._store.dispatch(new fromStore.ChatUpdatedBroadcast(chatClass));

                                break;
                            case 'ChatParticipante':
                                const chatParticipanteClass = plainToClass(ChatParticipante, action.payload.content);
                                this._store.dispatch(new AddData<ChatParticipante>({data: [chatParticipanteClass], schema: chatParticipanteSchema}));
                                if (!!chatOpen) {
                                    this._store.dispatch(new fromStore.ChatParticipanteUpdateBroadCast({chatParticipante: chatParticipanteClass}));
                                }
                                break;
                        }
                    } else if (action.payload.type === 'deleteData') {
                        switch (action.payload.content['@type']) {
                            case 'ChatParticipante':
                                const chatParticipante = plainToClass(ChatParticipante, action.payload.content);

                                if (chatOpen?.id === chatParticipante.chat.id) {
                                    if (this._loginService.getUserProfile()?.id === chatParticipante.usuario.id) {
                                        this._store.dispatch(new fromStore.CloseChat(chatOpen));
                                        this._store.dispatch(new fromStore.UnloadChat(chatParticipante.chat));
                                        this._store.dispatch(new fromStore.UnloadChatParticipantes());
                                        this._store.dispatch(new fromStore.UnloadChatMensagens());
                                    } else {
                                        this._store.dispatch(new fromStore.RemoverParticipanteSuccess({
                                            chatParticipante: chatParticipante
                                        }));
                                    }
                                }

                                break;
                            case 'Chat':
                                const chat = plainToClass(ChatParticipante, action.payload.content);
                                if (chatOpen?.id === chat.id) {
                                    this._store.dispatch(new fromStore.CloseChat(chatOpen));
                                    this._store.dispatch(new fromStore.UnloadChat(chat));
                                    this._store.dispatch(new fromStore.UnloadChatParticipantes());
                                } else {
                                    this._store.dispatch(new fromStore.UnloadChat(chat));
                                }

                                break;
                        }
                    }
                })
            );
    }, {dispatch: false})
}
