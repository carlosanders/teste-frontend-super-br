import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ClassificacaoEditActions from '../actions/classificacao-edit.actions';
import * as ClassificacaoListActions from '../../../classificacao-list/store/actions/classificacao-list.actions';

import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {classificacao as classificacaoSchema} from '@cdk/normalizr/classificacao.schema';
import {Classificacao} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ClassificacaoEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _ClassificacaoService: ClassificacaoService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get Classificacao with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoEditActions.GetClassificacao>(ClassificacaoEditActions.GET_CLASSIFICACAO),
                switchMap((action) => {
                    return this._ClassificacaoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true}));
                }),
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ClassificacaoEditActions.GetClassificacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Classificacao
     * @type {Observable<any>}
     */
    @Effect()
    saveClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoEditActions.SaveClassificacao>(ClassificacaoEditActions.SAVE_CLASSIFICACAO),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._ClassificacaoService.save(action.payload, context).pipe(
                        mergeMap((response: Classificacao) => [
                            new ClassificacaoListActions.ReloadClassificacao(),
                            new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                            new ClassificacaoEditActions.SaveClassificacaoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ClassificacaoEditActions.SaveClassificacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Update Classificacao
     * @type {Observable<any>}
     */
    @Effect()
    updateClassificacao: any =
        this._actions
            .pipe(
                ofType<ClassificacaoEditActions.UpdateClassificacao>(ClassificacaoEditActions.UPDATE_CLASSIFICACAO),
                switchMap((action) => {
                    return this._ClassificacaoService.patch(action.payload.Classificacao, action.payload.changes).pipe(
                        mergeMap((response: Classificacao) => [
                            new ClassificacaoListActions.ReloadClassificacao(),
                            new AddData<Classificacao>({data: [response], schema: classificacaoSchema}),
                            new ClassificacaoEditActions.UpdateClassificacaoSuccess(response)
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ClassificacaoEditActions.UpdateClassificacaoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Classificacao Success
     */
    @Effect({dispatch: false})
    saveClassificacaoSuccess: any =
        this._actions
            .pipe(
                ofType<ClassificacaoEditActions.SaveClassificacaoSuccess>(ClassificacaoEditActions.SAVE_CLASSIFICACAO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['/apps/admin/classificacoes/listar']).then();
                })
            );


    /**
     * Save Classificacao Success
     */
    @Effect({dispatch: false})
    updateClassificacaoSuccess: any =
        this._actions
            .pipe(
                ofType<ClassificacaoEditActions.UpdateClassificacaoSuccess>(ClassificacaoEditActions.UPDATE_CLASSIFICACAO_SUCCESS),
                tap((action) => {
                    this._router.navigate(['/apps/admin/classificacoes/listar']).then();
                })
            );


}
