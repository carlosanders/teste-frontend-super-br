import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as MercureActions from 'app/store/actions/mercure.action';
import {Observable} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';
import {Notificacao, OrigemDados} from '@cdk/models';
import {
    notificacao as notificacaoSchema,
    origemDados as origemDadosSchema
} from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import { GetNotificacaoSuccess, SetCount, SnackbarExibirNotificacao } from '../actions';

@Injectable()
export class MercureEffects {

    /**
     * Constructor
     */
    constructor(
        private _actions$: Actions,
        private _store: Store<State>
    ) {}

    @Effect({dispatch: false})
    message: Observable<any> =
        this._actions$
            .pipe(
                ofType<MercureActions.Message>(MercureActions.MESSAGE),
                tap((action): any => {
                    if (action.payload.type === 'addData') {
                        switch (action.payload.content['@type']) {
                            case 'Notificacao':
                                this._store.dispatch(new AddData<Notificacao>({
                                    data: [plainToClass(Notificacao, action.payload.content)],
                                    schema: notificacaoSchema
                                }));

                                this._store.dispatch(new GetNotificacaoSuccess(action.payload.content));

                                if (action.payload.content.dataHoraLeitura == null) {
                                    this._store.dispatch(new SnackbarExibirNotificacao({
                                        exibir: true,
                                        notificacao: plainToClass(Notificacao, action.payload.content)
                                    }));
                                }
                                break;
                            case 'OrigemDados':
                                this._store.dispatch(new AddData<OrigemDados>({
                                    data: [plainToClass(OrigemDados, action.payload.content)],
                                    schema: origemDadosSchema
                                }));
                                break;
                        }
                    }

                    if (action.payload.type === 'counter') {
                        this._store.dispatch(new SetCount(action.payload.content));
                    }
                })
            );

}
