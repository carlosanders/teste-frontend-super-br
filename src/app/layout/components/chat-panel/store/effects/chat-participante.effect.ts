import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, concatMap, mergeMap} from 'rxjs/operators';
import * as ChatParticipanteActions from '../actions/chat-participante.actions';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {ChatParticipante} from '@cdk/models';
import {
    chatParticipante as chatParticipanteSchema
} from '@cdk/normalizr';
import {Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {ChatParticipanteService} from "@cdk/services/chat-participante.service";
import {LoginService} from "../../../../../main/auth/login/login.service";
import * as moment from 'moment';

@Injectable()
export class ChatParticipanteEffect {

    /**
     * @param _actions
     * @param _store
     * @param _chatParticipanteService
     * @param _loginService
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _chatParticipanteService: ChatParticipanteService,
        private _loginService: LoginService
    ) {}

    limparMensagensNaoLidas: any = createEffect(() => {
        return this._actions
            .pipe(
                ofType<ChatParticipanteActions.LimparMensagensNaoLidas>(ChatParticipanteActions.LIMPAR_MENSAGENS_NAO_LIDAS),
                concatMap((action) => {
                    return this._chatParticipanteService.patch(action.payload,{mensagensNaoLidas: 0, ultimaVisualizacao: moment()})
                        .pipe(
                            mergeMap((response: ChatParticipante) => [
                                new UpdateData<ChatParticipante>({
                                    id: action.payload.id,
                                    schema: chatParticipanteSchema,
                                    changes: {mensagensNaoLidas: 0}
                                })
                            ])
                    );
                }),
                catchError((err, caught) => {
                    return caught;
                })
            );
    });
}
