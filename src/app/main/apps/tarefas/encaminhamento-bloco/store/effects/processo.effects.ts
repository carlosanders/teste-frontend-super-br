import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ProcessoActions from '../actions/processo.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {CdkUtils} from "../../../../../../../@cdk/utils";
import * as moment from "moment";

@Injectable()
export class ProcessoEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Processo
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveProcesso: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.SaveProcesso>(ProcessoActions.SAVE_PROCESSO),
                switchMap(action => this._processoService.arquivar(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new ProcessoActions.SaveProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} arquivado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            const payload = {
                                id: action.payload.id,
                                errors: err
                            };
                            const erroString = CdkUtils.errorsToString(err);
                            this._store.dispatch(new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Houve erro ao arquivar o processo ${action.payload.NUPFormatado}! ${erroString}`,
                                success: false,
                                dateTime: moment()
                            }));
                            return of(new ProcessoActions.SaveProcessoFailed(payload));
                        })
                    ))
            );


    /**
     * Save Processo Success
     */
    @Effect({ dispatch: false })
    saveProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<ProcessoActions.SaveProcessoSuccess>(ProcessoActions.SAVE_PROCESSO_SUCCESS),
                tap(() => {

                    this._router.navigate([
                        'apps/tarefas/' + this.routerState.params.generoHandle + '/'
                    + this.routerState.params.typeHandle + '/'
                    + this.routerState.params.targetHandle
                    ]).then();
                })
            );
}
