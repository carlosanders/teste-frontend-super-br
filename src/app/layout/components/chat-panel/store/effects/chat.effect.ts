import {Injectable} from '@angular/core';
import {Effect, Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as ChatActions from '../actions/chat.actions';
import {Observable} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';
import {Chat} from '@cdk/models';
import {
    chat as chatSchema
} from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {MensagemRecebida, NovoChatIniciado} from "../actions";
import {ChatService} from "@cdk/services/chat.service";

@Injectable()
export class ChatEffects {

    /**
     *
     * @param _actions
     * @param _store
     * @param _charService
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _charService: ChatService
    ) {}

    getChat: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatActions.GetChat>(ChatActions.GET_CHAT),
                switchMap((action) => {
                    return this._charService.query(
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
                        new AddData<Chat>({data: response['entities'], schema: chatSchema}),
                        new ChatActions.GetChatSuccess({
                            entitiesId: response['entities'].map(chat => chat.id),
                            loaded: true,
                            total: response['total']
                        })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ChatActions.GetChatFailed(err));
                    return caught;
                })
            );
    })
}
