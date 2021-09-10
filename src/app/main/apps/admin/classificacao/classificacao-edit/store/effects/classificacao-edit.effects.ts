import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ClassificacaoEditActions from '../actions/classificacao-edit.actions';
import * as ClassificacaoListActions from '../../../classificacao-list/store/actions/classificacao-list.actions';

import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr';
import {Classificacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ClassificacaoEditEffects {
    routerState: any;
    /**
     * Get Classificacao with router parameters
     *
     * @type {Observable<any>}
     */
    getClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoEditActions.GetClassificacao>(ClassificacaoEditActions.GET_CLASSIFICACAO),
        switchMap(action => this._classificacaoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Classificacao>({data: response['entities'], schema: classificacaoSchema}),
            new ClassificacaoEditActions.GetClassificacaoSuccess({
                loaded: {
                    id: 'classificacaoHandle',
                    value: this.routerState.params.classificacaoHandle
                },
                entityId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new ClassificacaoEditActions.GetClassificacaoFailed(err));
        })
    ));
    /**
     * Save Classificacao
     *
     * @type {Observable<any>}
     */
    saveClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoEditActions.SaveClassificacao>(ClassificacaoEditActions.SAVE_CLASSIFICACAO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'classificação',
            content: 'Salvando a classificação ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._classificacaoService.save(action.payload.classificacao, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'classificação',
                    content: 'Classificação id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Classificacao) => [
                    new ClassificacaoEditActions.SaveClassificacaoSuccess(response),
                    new ClassificacaoListActions.ReloadClassificacao(),
                    new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                    new UpdateData<Classificacao>({
                        id: response.id,
                        schema: classificacaoSchema,
                        changes: response
                    })
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'classificação',
                        content: 'Erro ao salvar a classificação!',
                        status: 2, // erro
                    }));
                    return of(new ClassificacaoEditActions.SaveClassificacaoFailed(err));
                })
            );
        })
    ));
    /**
     * Update Classificacao
     *
     * @type {Observable<any>}
     */
    updateClassificacao: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoEditActions.UpdateClassificacao>(ClassificacaoEditActions.UPDATE_CLASSIFICACAO),
        switchMap(action => this._classificacaoService.patch(action.payload.Classificacao, action.payload.changes).pipe(
            mergeMap((response: Classificacao) => [
                new ClassificacaoListActions.ReloadClassificacao(),
                new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                new ClassificacaoEditActions.UpdateClassificacaoSuccess(response)
            ])
        )),
        catchError((err) => {
            console.log(err);
            return of(new ClassificacaoEditActions.UpdateClassificacaoFailed(err));
        })
    ));
    /**
     * Save Classificacao Success
     */
    saveClassificacaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoEditActions.SaveClassificacaoSuccess>(ClassificacaoEditActions.SAVE_CLASSIFICACAO_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/classificacoes/listar']).then();
        })
    ), {dispatch: false});
    /**
     * Save Classificacao Success
     */
    updateClassificacaoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ClassificacaoEditActions.UpdateClassificacaoSuccess>(ClassificacaoEditActions.UPDATE_CLASSIFICACAO_SUCCESS),
        tap(() => {
            this._router.navigate(['/apps/admin/classificacoes/listar']).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _classificacaoService: ClassificacaoService,
        private _store: Store<State>,
        private _loginService: LoginService,
        private _router: Router
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
