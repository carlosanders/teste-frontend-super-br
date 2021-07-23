import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import * as ChatParticipanteActions from '../actions/chat-participante.actions';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Chat, ChatParticipante} from '@cdk/models';
import {chatParticipante as chatParticipanteSchema, chat as chatSchema} from '@cdk/normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatParticipanteService} from "@cdk/services/chat-participante.service";
import {LoginService} from "../../../../../main/auth/login/login.service";
import {of} from "rxjs";

@Injectable()
export class ChatParticipanteEffect {

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _chatParticipanteService: ChatParticipanteService,
        private _loginService: LoginService
    ) {}

    getParticipantes: any = createEffect(() => {
            return this._actions
                .pipe(
                    ofType<ChatParticipanteActions.GetParticipantes>(ChatParticipanteActions.GET_PARTICIPANTES),
                    switchMap((action) => {
                        return this._chatParticipanteService.query(
                            JSON.stringify({
                                ...action.payload.pagination.filter,
                                ...action.payload.pagination.gridFilter,
                            }),
                            action.payload.pagination.limit,
                            action.payload.pagination.offset,
                            JSON.stringify(action.payload.pagination.sort),
                            JSON.stringify(action.payload.pagination.populate),
                            JSON.stringify(action.payload.pagination.context)
                        );
                    }),
                    mergeMap((response) => [
                            new AddData<ChatParticipante>({data: response['entities'], schema: chatParticipanteSchema}),
                            new ChatParticipanteActions.GetParticipantesSuccess({
                                entitiesId: response['entities'].map(chatParticipante => chatParticipante.id),
                                loaded: true,
                                total: response['total']
                            })
                    ]),
                    catchError((err, caught) => {
                        this._store.dispatch(new ChatParticipanteActions.GetParticipantesFailed(err));
                        return caught;
                    })
                );
        })

    limparMensagensNaoLidas: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatParticipanteActions.LimparMensagensNaoLidas>(ChatParticipanteActions.LIMPAR_MENSAGENS_NAO_LIDAS),
                concatMap((action) => {
                    return this._chatParticipanteService.limparMensagens(
                        action.payload.chat,
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context)
                    )
                        .pipe(
                            mergeMap((response: ChatParticipante) => [
                                new UpdateData<ChatParticipante>({
                                    id: response.id,
                                    schema: chatParticipanteSchema,
                                    changes: {mensagensNaoLidas: 0}
                                }),
                                new AddData<Chat>({
                                    data: [response.chat],
                                    schema: chatSchema,
                                })
                            ])
                    );
                }),
                catchError((err, caught) => {
                    return caught;
                })
            );
    });

    addParticipante: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatParticipanteActions.AddParticipante>(ChatParticipanteActions.ADD_PARTICIPANTE),
                concatMap((action) => {
                    return this._chatParticipanteService.save(
                        action.payload.chatParticipante,
                        JSON.stringify(action.payload.context),
                        JSON.stringify(action.payload.populate),
                    )
                        .pipe(
                            mergeMap((response: ChatParticipante) => [
                                new AddData<ChatParticipante>({
                                    data: [response],
                                    schema: chatParticipanteSchema
                                }),
                                new AddData<Chat>({
                                    data: [response.chat],
                                    schema: chatSchema
                                }),
                                new ChatParticipanteActions.AddParticipanteSuccess(response)
                            ])
                    );
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatParticipanteActions.AddParticipanteFailed(err));
                    return caught;
                })
            );
    });

    updateParticipante: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatParticipanteActions.UpdateParticipante>(ChatParticipanteActions.UPDATE_PARTICIPANTE),
                concatMap((action) => {
                    return this._chatParticipanteService.patch(
                        action.payload.chatParticipante,
                        action.payload.changes,
                        JSON.stringify(action.payload.populate),
                        JSON.stringify(action.payload.context),
                    )
                        .pipe(
                            concatMap((response: ChatParticipante) => [
                                new AddData<ChatParticipante>({
                                    data: [response],
                                    schema: chatParticipanteSchema
                                }),
                                new AddData<Chat>({
                                    data: [response.chat],
                                    schema: chatSchema
                                }),
                                new ChatParticipanteActions.UpdateParticipanteSuccess(response)
                            ])
                    );
                }),
                catchError((err, caught) => {
                    this._store.dispatch(new ChatParticipanteActions.UpdateParticipanteFailed(err));
                    return caught;
                })
            );
    });

    removerParticipante: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatParticipanteActions.RemoverParticipante>(ChatParticipanteActions.REMOVER_PARTICIPANTE),
                mergeMap((action) => {
                    return this._chatParticipanteService.destroy(
                            action.payload.chatParticipante.id,
                            JSON.stringify(action.payload.context)
                    ).pipe(
                        map((response: ChatParticipante) => {
                            return new ChatParticipanteActions.RemoverParticipanteSuccess(action.payload);
                        }),
                        catchError((err, caught) => {
                            return of(new ChatParticipanteActions.RemoverParticipanteFailed({
                                ...action.payload,
                                "errors": err
                            }));
                        })
                    );
                })
            );
    });
}
