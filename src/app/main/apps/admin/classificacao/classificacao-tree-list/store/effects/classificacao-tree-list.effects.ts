import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';
import {getRouterState, State} from '../../../../../../../store';
import * as ClassificacaoTreeListActions from '../actions';
import {LoginService} from '../../../../../../auth/login/login.service';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Classificacao} from '@cdk/models';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import * as ClassificacaoListActions from '../../../classificacao-list/store/actions/classificacao-list.actions';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ClassificacaoTreeListEffects {
    routerState: any;
    /**
     * Get Classificacao with router parameters
     *
     * @type {Observable<any>}
     */
    getClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoTreeListActions.GetClassificacao>(ClassificacaoTreeListActions.GET_CLASSIFICACAO),
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
                new ClassificacaoTreeListActions.GetClassificacaoSuccess({
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
                return of(new ClassificacaoTreeListActions.GetClassificacaoFailed(err));
            })
        ))
    ));
    /**
     * Save Classificacao
     *
     * @type {Observable<any>}
     */
    saveClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoTreeListActions.SaveClassificacao>(ClassificacaoTreeListActions.SAVE_CLASSIFICACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'classificação',
            content: 'Salvando a classificação ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._classificacaoService.save(action.payload.classificacao).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'classificação',
                content: 'Classificação id ' + response.id + ' salva com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Classificacao) => [
                new ClassificacaoTreeListActions.SaveClassificacaoSuccess(response),
                new ClassificacaoListActions.ReloadClassificacao(),
                new AddData<Classificacao>({data: [response], schema: classificacaoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificação',
                    content: 'Erro ao salvar a classificação!',
                    status: 2, // erro
                }));
                return of(new ClassificacaoTreeListActions.SaveClassificacaoFailed(err));
            })
        ))
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
