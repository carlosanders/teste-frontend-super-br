import {Injectable} from '@angular/core';
import {Effect, Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as ChatMensagemActions from '../actions/chat-mensagem.actions';
import {Observable} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';
import {ChatMensagem, GrupoContato} from '@cdk/models';
import {
    chatMensagem as chatMensagemSchema, grupoContato as grupoContatoSchema
} from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatMensagemService} from "@cdk/services/chat-mensagem.service";
import * as GrupoContatoEditActions
    from "../../../../../main/apps/configuracoes/grupo-contato/grupo-contato-edit/store/actions/grupo-contato-edit.actions";
import * as GrupoContatoListActions
    from "../../../../../main/apps/configuracoes/grupo-contato/grupo-contato-list/store/actions/grupo-contato-list.actions";

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
                    console.log('nova mensagem do mercure!',action)
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

    enviarMensagem: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatMensagemActions.EnviarMensagem>(ChatMensagemActions.ENVIAR_MENSAGEM),
                switchMap((action) => {
                    return this._chatMensagemService.save(action.payload).pipe(
                        mergeMap((response: ChatMensagem) => [
                            new ChatMensagemActions.EnviarMensagemSuccess(response),
                            new AddData<ChatMensagem>({data: [response], schema: chatMensagemSchema})
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
