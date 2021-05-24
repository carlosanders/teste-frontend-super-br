import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, tap} from 'rxjs/operators';

import * as ProtocoloCreateActions from '../actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr';
import {Processo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {ReloadProcessos, UnloadProcessos} from '../../../store';

@Injectable()
export class ProtocoloCreateEffects {
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
                ofType<ProtocoloCreateActions.SaveProcesso>(ProtocoloCreateActions.SAVE_PROCESSO),
                mergeMap(action => this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new AddData<Processo>({data: [response], schema: processoSchema}),
                            new ProtocoloCreateActions.SaveProcessoSuccess(response),
                            new UnloadProcessos({reset: false}),
                            new ReloadProcessos(),
                            new OperacoesActions.Resultado({
                                type: 'processo',
                                content: `Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ProtocoloCreateActions.SaveProcessoFailed(err));
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
                ofType<ProtocoloCreateActions.SaveProcessoSuccess>(ProtocoloCreateActions.SAVE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url + '/' + action.payload.id]).then();
                })
            );

    /**
     * Concluir Processo
     */
    @Effect({ dispatch: false })
    concluirProcesso: any =
        this._actions
            .pipe(
                ofType<ProtocoloCreateActions.ConcluirProcesso>(ProtocoloCreateActions.CONCLUIR_PROCESSO),
                tap(() => {
                    this._router.navigate([this.routerState.url.split('/criar')[0]]).then();
                })
            );
}
