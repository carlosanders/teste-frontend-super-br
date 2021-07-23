import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, mergeMap, switchMap} from 'rxjs/operators';
import * as ChatMensagemActions from '../actions/chat-mensagem.actions';
import {AddData} from '@cdk/ngrx-normalizr';
import {ChatMensagem} from '@cdk/models';
import {chatMensagem as chatMensagemSchema} from '@cdk/normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatMensagemService} from "@cdk/services/chat-mensagem.service";

@Injectable()
export class ChatMensagemEffects {

    /**
     *
     * @param _actions
     * @param _store
     * @param _chatMensagemService
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _chatMensagemService: ChatMensagemService
    ) {}

    getChatMensagens: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatMensagemActions.GetMensagens>(ChatMensagemActions.GET_MENSAGENS),
                switchMap((action) => {
                    return this._chatMensagemService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    );
                }),
                mergeMap((response) => [
                        new AddData<ChatMensagem>({data: response['entities'], schema: chatMensagemSchema}),
                        new ChatMensagemActions.GetMensagensSuccess({
                            entitiesId: response['entities'].map(chatMensagem => chatMensagem.id),
                            loaded: true,
                            total: response['total']
                        })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatMensagemActions.GetMensagensFailed(err));
                    return caught;
                })
            );
    });

    getChatMensagensIncrement: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatMensagemActions.GetMensagensIncrement>(ChatMensagemActions.GET_MENSAGENS_INCREMENT),
                switchMap((action) => {
                    return this._chatMensagemService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    );
                }),
                mergeMap((response) => [
                        new AddData<ChatMensagem>({data: response['entities'], schema: chatMensagemSchema}),
                        new ChatMensagemActions.GetMensagensIncrementSuccess({
                            entitiesId: response['entities'].map(chatMensagem => chatMensagem.id),
                            loaded: true,
                            total: response['total']
                        })
                ]),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatMensagemActions.GetMensagensIncrementFailed(err));
                    return caught;
                })
            );
    });

    enviarMensagem: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatMensagemActions.EnviarMensagem>(ChatMensagemActions.ENVIAR_MENSAGEM),
                concatMap((action) => {
                    return this._chatMensagemService.save(action.payload).pipe(
                        mergeMap((response: ChatMensagem) => [
                            new AddData<ChatMensagem>({
                                data: [action.payload],
                                schema: chatMensagemSchema
                            }),
                            new ChatMensagemActions.EnviarMensagemSuccess(response),
                        ])
                    );
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatMensagemActions.GetMensagensFailed(err));
                    return caught;
                })
            );
    });

}
