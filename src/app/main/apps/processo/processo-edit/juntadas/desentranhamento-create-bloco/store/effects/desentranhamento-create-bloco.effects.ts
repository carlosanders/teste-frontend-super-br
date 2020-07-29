import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as DesentranhamentoCreateBlocoActions from '../actions/desentranhamento-create-bloco.actions';

import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {desentranhamento as desentranhamentoSchema} from '@cdk/normalizr';
import {Desentranhamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class DesentranhamentoCreateBlocoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _desentranhamentoService: DesentranhamentoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(
                select(getRouterState),
            ).subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Desentranhamento
     * @type {Observable<any>}
     */
    @Effect()
    saveDesentranhamento: any =
        this._actions
            .pipe(
                ofType<DesentranhamentoCreateBlocoActions.SaveDesentranhamento>(DesentranhamentoCreateBlocoActions.SAVE_DESENTRANHAMENTO),
                mergeMap((action) => {
                    return this._desentranhamentoService.save(action.payload).pipe(
                        mergeMap((response: Desentranhamento) => [
                            new DesentranhamentoCreateBlocoActions.SaveDesentranhamentoSuccess(action.payload),
                            new AddData<Desentranhamento>({data: [response], schema: desentranhamentoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'desentranhamento',
                                content: `Desentranhamento na juntada id ${action.payload.juntada.id} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'desentranhamento',
                                content: `Houve erro no desentranhamento na juntada id ${action.payload.juntada.id}! ${err.error.message}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new DesentranhamentoCreateBlocoActions.SaveDesentranhamentoFailed(action.payload));
                        })
                    );
                })
            );

}
