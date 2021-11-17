import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../../../store';
import * as EspeciesProcessoListActions from '../actions';
import {LoginService} from '../../../../../../../../auth/login/login.service';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {EspecieProcesso} from '@cdk/models';
import {especieProcesso as especieProcessoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class EspeciesProcessoListEffects {

    routerState: any;

    /**
     * Get EspecieProcesso with router parameters
     *
     * @type {Observable<any>}
     */
    getEspecieProcesso: any = createEffect(() => this._actions.pipe(
        ofType<EspeciesProcessoListActions.GetEspecieProcesso>(EspeciesProcessoListActions.GET_ESPECIE_PROCESSO),
        switchMap(action => this._especieProcessoService.query(
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
                new AddData<EspecieProcesso>({data: response['entities'], schema: especieProcessoSchema}),
                new EspeciesProcessoListActions.GetEspecieProcessoSuccess({
                    entitiesId: response['entities'].map(especieProcesso => especieProcesso.id),
                    loaded: {
                        id: 'workflowHandle',
                        value: this.routerState.params.workflowHandle
                    },
                    total: response['total']

                })
            ]),
            catchError(err => of(new EspeciesProcessoListActions.GetEspecieProcessoFailed(err)))
        ))
    ));

    /**
     * Update EspecieProcesso
     *
     * @type {Observable<any>}
     */
    updateEspecieProcesso: any = createEffect(() => this._actions.pipe(
        ofType<EspeciesProcessoListActions.UpdateEspecieProcesso>(EspeciesProcessoListActions.UPDATE_ESPECIE_PROCESSO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'espécie processo',
            content: 'Apagando a espécie processo id ' + action.payload.especieProcesso.id + '...',
            status: 0, // carregando
        }))),
        switchMap(action => this._especieProcessoService.patch(action.payload.especieProcesso, {workflow: null}).pipe(
            map((response: EspecieProcesso) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'espécie processo',
                    content: 'Espécie processo id ' + action.payload.especieProcesso.id + ' deletada com sucesso.',
                    status: 1, // sucesso
                }));
                this._store.dispatch(new UpdateData<EspecieProcesso>({
                    id: response.id,
                    schema: especieProcessoSchema,
                    changes: {workflow: null}
                }));
                return new EspeciesProcessoListActions.UpdateEspecieProcessoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.especieProcesso.id,
                    error: err
                };
                console.log(err);
                return of(new EspeciesProcessoListActions.UpdateEspecieProcessoFailed(payload));
            })
        ))
    ));

    constructor(
        private _actions: Actions,
        private _especieProcessoService: EspecieProcessoService,
        private _loginService: LoginService,
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
