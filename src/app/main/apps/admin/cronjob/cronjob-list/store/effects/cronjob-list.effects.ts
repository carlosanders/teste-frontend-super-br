import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from 'app/store';
import * as CronjobListActions from '../actions';
import {CronjobService} from '@cdk/services/cronjob.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Cronjob} from '@cdk/models';
import {cronjob as cronjobSchema} from '@cdk/normalizr';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';


@Injectable()
export class CronjobListEffects {
    routerState: any;

    /**
     * Get Cronjob with router parameters
     *
     * @type {Observable<any>}
     */
    getCronjob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobListActions.GetCronjob>(CronjobListActions.GET_CRONJOB),
        switchMap(action => this._cronjobService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<Cronjob>({data: response['entities'], schema: cronjobSchema}),
                new CronjobListActions.GetCronjobSuccess({
                    entitiesId: response['entities'].map(cronjob => cronjob.id),
                    loaded: {
                        id: 'cronjobHandle',
                        value: this.routerState.params.cronjobHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                return of(new CronjobListActions.GetCronjobFailed(err));
            })
        ))
    ));

    deleteCronjob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobListActions.DeleteCronjob>(CronjobListActions.DELETE_CRONJOB),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'cronjob',
            content: 'Apagando o cronjob id ' + action.payload.cronjobId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._cronjobService.destroy(action.payload.cronjobId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'cronjob',
                    content: 'Cronjob id ' + action.payload.cronjobId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Cronjob>({
                    id: response.id,
                    schema: cronjobSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new CronjobListActions.DeleteCronjobSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.cronjobId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'cronjob',
                    content: 'Erro ao apagar o cronjob id ' + action.payload.cronjobId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                return of(new CronjobListActions.DeleteCronjobFailed(payload));
            })
        ), 25)
    ));

    executeCronJob: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<CronjobListActions.ExecuteCronjob>(CronjobListActions.EXECUTE_CRONJOB),
        mergeMap(action => this._cronjobService.startJob(
            action.payload,
            JSON.stringify(['populateAll'])
        ).pipe(
            mergeMap(response => [
                new CronjobListActions.ExecuteCronjobSuccess(response.id),
                new AddData<Cronjob>(
                    {
                        data: [response],
                        schema: cronjobSchema
                    }
                )
            ]),
            catchError((err) => {
                return of(new CronjobListActions.ExecuteCronjobFailed(action.payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _cronjobService: CronjobService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
