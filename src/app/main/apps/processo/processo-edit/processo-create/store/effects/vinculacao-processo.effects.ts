import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import * as VinculacoesProcessosActions from '../actions/vinculacao-processo.actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {VinculacaoProcesso} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {vinculacaoProcesso as vinculacaoProcessoSchema} from '@cdk/normalizr';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';
import {getVinculacoesProcessosPagination} from '../selectors';

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

    /**
     * Save VinculacaoProcesso
     * @type {Observable<any>}
     */
    @Effect()
    saveVinculacaoProcesso: any =
        this._actions
            .pipe(
                ofType<VinculacoesProcessosActions.SaveVinculacaoProcesso>(VinculacoesProcessosActions.SAVE_VINCULACAO_PROCESSO),
                switchMap((action) => {
                    return this._vinculacaoProcessoService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoProcesso) => [
                            new VinculacoesProcessosActions.SaveVinculacaoProcessoSuccess(),
                            new AddData<VinculacaoProcesso>({data: [response], schema: vinculacaoProcessoSchema}),
                            new OperacoesActions.Resultado({
                                type: 'vinculacaoProcesso',
                                content: `Vinculação do Processo id ${response.id} criada com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VinculacoesProcessosActions.SaveVinculacaoProcessoFailed(err));
                        })
                    );
                })
            );

    /**
     * Save VinculacaoProcesso Success
     * @type {Observable<any>}
     */
    @Effect({dispatch: false})
    saveVinculacoesProcessosSuccess: any =
        this._actions
            .pipe(
                ofType<VinculacoesProcessosActions.SaveVinculacaoProcessoSuccess>(VinculacoesProcessosActions.SAVE_VINCULACAO_PROCESSO_SUCCESS),
                withLatestFrom(this._store.pipe(select(getVinculacoesProcessosPagination))),
                tap(([action, pagination]) => {
                    this._store.dispatch(new VinculacoesProcessosActions.GetVinculacoesProcessos(pagination));
                }),
            );

    /**
     * Delete VinculacaoProcesso
     * @type {Observable<any>}
     */
    @Effect()
    deleteVinculacaoProcesso: any =
        this._actions
            .pipe(
                ofType<VinculacoesProcessosActions.DeleteVinculacaoProcesso>(VinculacoesProcessosActions.DELETE_VINCULACAO_PROCESSO),
                mergeMap((action) => {
                    return this._vinculacaoProcessoService.destroy(action.payload).pipe(
                        map((response) => new VinculacoesProcessosActions.DeleteVinculacaoProcessoSuccess(response.id)),
                        catchError((err) => {
                            console.log(err);
                            return of(new VinculacoesProcessosActions.DeleteVinculacaoProcessoFailed(action.payload));
                        })
                    );
                })
            );
}
