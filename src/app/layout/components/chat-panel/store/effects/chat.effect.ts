import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import * as ChatActions from '../actions/chat.actions';
import * as ChatMensagemActions from '../actions/chat-mensagem.actions';
import * as ChatParticipanteActions from '../actions/chat-participante.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {Chat, ComponenteDigital} from '@cdk/models';
import {chat as chatSchema, componenteDigital as componenteDigitalSchema} from '@cdk/normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatService} from '@cdk/services/chat.service';
import {of} from 'rxjs';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

@Injectable()
export class ChatEffects {

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _chatService: ChatService,
        private _componenteDigitalService: ComponenteDigitalService
    ) {}

    getChat: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.GetChat>(ChatActions.GET_CHAT),
                switchMap((action) => {
                    return this._chatService.findChatList(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    );
                }),
                mergeMap((response) => [
                        new AddData<Chat>({data: response['entities'], schema: chatSchema}),
                        new ChatActions.GetChatSuccess({
                            entitiesId: response['entities'].map(chat => chat.id),
                            loaded: true,
                            total: response['total']
                        })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatActions.GetChatFailed(err));
                    return caught;
                })
            );
    })

    getChatIncrement: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.GetChatIncrement>(ChatActions.GET_CHAT_INCREMENT),
                switchMap((action) => {
                    return this._chatService.findChatList(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    );
                }),
                mergeMap((response) => [
                        new AddData<Chat>({data: response['entities'], schema: chatSchema}),
                        new ChatActions.GetChatIncrementSuccess({
                            entitiesId: response['entities'].map(chat => chat.id),
                            loaded: true,
                            total: response['total']
                        })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatActions.GetChatFailed(err));
                    return caught;
                })
            );
    })

    criarOuRetornar: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.CriarOuRetornar>(ChatActions.CRIAR_OU_RETORNAR),
                switchMap((action) => {
                    return this._chatService.criarOuRetornar(
                        action.payload.usuario,
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context),
                    );
                }),
                mergeMap((response) => [
                        new AddData<Chat>({data: [response], schema: chatSchema}),
                        new ChatActions.OpenChat(response),
                        new ChatActions.ChatUpdatedBroadcast(response)
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatActions.GetChatFailed(err));
                    return caught;
                })
            );
    });

    chatSave: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.ChatSave>(ChatActions.CHAT_SAVE),
                switchMap((action) => {

                    return this._chatService.save(
                        action.payload.chat,
                        JSON.stringify(action.payload.context),
                        JSON.stringify(action.payload.populate)
                    ).pipe(
                        mergeMap((response) => {
                            let effects = [
                                new AddData<Chat>({data: [response], schema: chatSchema}),
                                new ChatActions.ChatSaveSuccess(response),
                                new ChatActions.ChatUpdatedBroadcast(response),
                                new ChatActions.OpenChat(response)
                            ];

                            if (!action.payload.chat.id) {
                                effects = [
                                    ...effects,
                                    new ChatActions.SetChatActiveCard('chat-participantes-list')
                                ]
                            }

                            return effects;
                        }),
                        catchError((err, caught) => {
                            this._store.dispatch(new ChatActions.ChatSaveFailed(err));
                            return caught;
                        })
                    );
                })
            );
    });

    uploadImagemCapa: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.UploadImagemCapa>(ChatActions.UPLOAD_IMAGEM_CAPA),
                switchMap((action) => {
                    return this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new AddData<ComponenteDigital>({data: [response], schema: componenteDigitalSchema}),
                            new ChatActions.UploadImagemCapaSuccess(response)
                        ]),
                        catchError((err) => {
                            return of(new ChatActions.UploadImagemCapaFailed(err));
                        })
                    );
                })
            );
    });

    setChatActiveCard: any = createEffect((): any => {
        return this._actions
            .pipe(
                ofType<ChatActions.SetChatActiveCard>(ChatActions.SET_CHAT_ACTIVE_CARD),
                mergeMap((action) => [
                    new ChatMensagemActions.ChatMensagensLimparErros(),
                    new ChatParticipanteActions.ChatParticipanteLimparErros()
                ])
            );
    });

    chatExcluir: any = createEffect(() => {
            return this._actions
                .pipe(
                    ofType<ChatActions.ChatExcluir>(ChatActions.CHAT_EXCLUIR),
                    mergeMap((action) => {
                        return this._chatService.destroy(
                                action.payload.chat.id,
                                JSON.stringify(action.payload.context)
                        ).pipe(
                            mergeMap((response: Chat) => [
                                new ChatActions.ChatExcluirSuccess(action.payload),
                                new ChatActions.CloseChat(action.payload),
                                new ChatMensagemActions.UnloadChatMensagens(),
                                new ChatParticipanteActions.UnloadChatParticipantes(),
                            ]),
                            catchError((err, caught) => {
                                return of(new ChatActions.ChatExcluirFailed({
                                    ...action.payload,
                                    'errors': err
                                }));
                            })
                        );
                    })
                );
        });
}
