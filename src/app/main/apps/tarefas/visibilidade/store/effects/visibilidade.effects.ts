import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VisibilidadeActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {Visibilidade} from '@cdk/models';
import {visibilidade as visibilidadeSchema} from '@cdk/normalizr';
import {ProcessoService} from '@cdk/services/processo.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as moment from 'moment';

@Injectable()
export class VisibilidadeEffect {

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    routerState: any;

    /**
     * Get Visibilidades with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getVisibilidades: any =
        this._actions
            .pipe(
                ofType<VisibilidadeActions.GetVisibilidades>(VisibilidadeActions.GET_VISIBILIDADES_PROCESSO),
                switchMap(action => this._processoService.getVisibilidade(
                        action.payload)),
                mergeMap(response => [
                    new AddData<Visibilidade>({data: response, schema: visibilidadeSchema}),
                    new VisibilidadeActions.GetVisibilidadesSuccess({
                        entitiesId: response.map(visibilidade => visibilidade.id),
                        loaded: {
                            id: 'processoHandle',
                            value: this.routerState.params.processoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    return of(new VisibilidadeActions.GetVisibilidadesFailed(err));
                })

            );

    /**
     * Delete Visibilidade
     *
     * @type {Observable<any>}
     */
    @Effect()
    deleteVisibilidade: Observable<VisibilidadeActions.VisibilidadeActionsAll> =
        this._actions
            .pipe(
                ofType<VisibilidadeActions.DeleteVisibilidade>(VisibilidadeActions.DELETE_VISIBILIDADE_PROCESSO),
                tap((action) => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'visibilidade',
                        content: 'Apagando a visibilidade id ' + action.payload.visibilidadeId + '...',
                        status: 0, // carregando
                        lote: action.payload.loteId
                    }));
                }),
                mergeMap((action) => {
                    return this._processoService.destroyVisibilidade(action.payload.processoId, action.payload.visibilidadeId).pipe(
                        map((response) => {
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'visibilidade',
                                content: 'Visibilidade id ' + action.payload.visibilidadeId + ' deletada com sucesso.',
                                status: 1, // sucesso
                                lote: action.payload.loteId
                            }));
                            return new VisibilidadeActions.DeleteVisibilidadeSuccess(response.id);
                        }),
                        catchError((err) => {
                            const payload = {
                                id: action.payload.visibilidadeId,
                                error: err
                            };
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'visibilidade',
                                content: 'Erro ao apagar a visibilidade id ' + action.payload.visibilidadeId + '!',
                                status: 2, // erro
                                lote: action.payload.loteId
                            }));
                            console.log(err);
                            return of(new VisibilidadeActions.DeleteVisibilidadeFailed(payload));
                        })
                    );
                }, 25)
            );

    /**
     * Save Visibilidade
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveVisibilidade: any =
        this._actions
            .pipe(
                ofType<VisibilidadeActions.SaveVisibilidadeProcesso>(VisibilidadeActions.SAVE_VISIBILIDADE_PROCESSO),
                switchMap(action => this._processoService.createVisibilidade(action.payload.processoId, action.payload.visibilidade).pipe(
                        mergeMap((response: Visibilidade) => [
                            new VisibilidadeActions.SaveVisibilidadeProcessoSuccess(),
                            new VisibilidadeActions.GetVisibilidades(action.payload.processoId),
                            new AddData<Visibilidade>({data: [response], schema: visibilidadeSchema}),
                            new OperacoesActions.Resultado({
                                type: 'visibilidade',
                                content: `Visibilidade id ${response.id} criada com sucesso!`,
                                dateTime: moment()
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new VisibilidadeActions.SaveVisibilidadeProcessoFailed(err));
                        })
                    ))
            );

}
