import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as VinculacoesProcessosActions from '../actions/vinculacao-processo.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr/vinculacao-processo.schema';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';

@Injectable()
export class VinculacaoProcessoEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _vinculacaoProcessoService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _vinculacaoProcessoService: VinculacaoProcessoService,
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
     * Get VinculacoesProcessos Processo
     * @type {Observable<any>}
     */
    @Effect()
    getVinculacoesProcessosProcesso: Observable<any> =
        this._actions
            .pipe(
                ofType<VinculacoesProcessosActions.GetVinculacoesProcessos>(VinculacoesProcessosActions.GET_VINCULACOES_PROCESSOS),
                switchMap((action) => {
                    return this._vinculacaoProcessoService.query(
                        JSON.stringify({
                            ...action.payload.filter,
                            ...action.payload.listFilter
                        }),
                        action.payload.imit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap((response) => [
                    new AddData<VinculacaoProcesso>({data: response['entities'], schema: vinculacaoProcessoSchema}),
                    new VinculacoesProcessosActions.GetVinculacoesProcessosSuccess({
                        entitiesId: response['entities'].map(vinculacaoProcesso => vinculacaoProcesso.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle,
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new VinculacoesProcessosActions.GetVinculacoesProcessosFailed(err));
                    return caught;
                })
            );
}
