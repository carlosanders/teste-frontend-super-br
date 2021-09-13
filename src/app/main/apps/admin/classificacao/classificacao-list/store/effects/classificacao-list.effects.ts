import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as ClassificacaoListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import * as OperacoesActions from '../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class ClassificacaoListEffects {

    routerState: any;
    /**
     * Get Classificacao with router parameters
     *
     * @type {Observable<any>}
     */
    getClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoListActions.GetClassificacao>(ClassificacaoListActions.GET_CLASSIFICACAO),
        switchMap(action => this._classificacaoService.query(
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
                new AddData<Classificacao>({data: response['entities'], schema: classificacaoSchema}),
                new ClassificacaoListActions.GetClassificacaoSuccess({
                    entitiesId: response['entities'].map(classificacao => classificacao.id),
                    loaded: {
                        id: 'classificacaoHandle',
                        value: this.routerState.params.classificacaoHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ClassificacaoListActions.GetClassificacaoFailed(err));
            })
        ))
    ));
    /**
     * Delete Classificacao
     *
     * @type {Observable<any>}
     */
    deleteClassificacao: Observable<ClassificacaoListActions.ClassificacaoListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoListActions.DeleteClassificacao>(ClassificacaoListActions.DELETE_CLASSIFICACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'classificação',
            content: 'Apagando a classificação id ' + action.payload.classificacaoId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._classificacaoService.destroy(action.payload.classificacaoId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificação',
                    content: 'Classificação id ' + action.payload.classificacaoId + ' deletada com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<Classificacao>({
                    id: response.id,
                    schema: classificacaoSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new ClassificacaoListActions.DeleteClassificacaoSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.classificacaoId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificação',
                    content: 'Erro ao apagar a classificação id ' + action.payload.classificacaoId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new ClassificacaoListActions.DeleteClassificacaoFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
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
