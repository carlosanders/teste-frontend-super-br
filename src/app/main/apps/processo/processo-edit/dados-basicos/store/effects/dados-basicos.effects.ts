import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as DadosBasicosActions from '../actions/dados-basicos.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {processo as processoSchema} from '@cdk/normalizr/processo.schema';
import {Processo} from '@cdk/models/processo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';

@Injectable()
export class DadosBasicosEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save Processo
     * @type {Observable<any>}
     */
    @Effect()
    saveProcesso: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcesso>(DadosBasicosActions.SAVE_PROCESSO),
                switchMap((action) => {
                    return this._processoService.save(action.payload).pipe(
                        mergeMap((response: Processo) => [
                            new DadosBasicosActions.SaveProcessoSuccess(response),
                            new AddData<Processo>({data: [response], schema: processoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log (caught);
                    this._store.dispatch(new DadosBasicosActions.SaveProcessoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Processo Success
     */
    @Effect({ dispatch: false })
    saveProcessoSuccess: any =
        this._actions
            .pipe(
                ofType<DadosBasicosActions.SaveProcessoSuccess>(DadosBasicosActions.SAVE_PROCESSO_SUCCESS),
                tap((action) => {
                    this._router.navigate([this.routerState.url.replace('dados-basicos', 'assuntos/listar').replace('criar', action.payload.id)]).then();
                })
            );
}
