import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as UnidadeEditActions from '../actions/unidade-edit.actions';
import * as UnidadesListActions from '../../../unidades-list/store/actions/unidades-list.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class UnidadeEditEffects {
    routerState: any;
    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    getUnidade: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UnidadeEditActions.GetUnidade>(UnidadeEditActions.GET_UNIDADE),
        switchMap(action => this._setorService.get(
            action.payload.id,
            JSON.stringify(['populateAll']),
            JSON.stringify({isAdmin: true}))),
        switchMap(response => [
            new AddData<Setor>({data: [response], schema: setorSchema}),
            new UnidadeEditActions.GetUnidadeSuccess({
                loaded: {
                    id: 'unidadeHandle',
                    value: this.routerState.params.unidadeHandle
                },
                setorId: this.routerState.params.unidadeHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new UnidadeEditActions.GetUnidadeFailed(err));
        })
    ));
    /**
     * Save Unidade
     *
     * @type {Observable<any>}
     */
    saveUnidade: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UnidadeEditActions.SaveUnidade>(UnidadeEditActions.SAVE_UNIDADE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'unidade',
            content: 'Salvando a unidade ...',
            status: 0, // carregando
        }))),
        switchMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._setorService.save(action.payload.unidade, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'unidade',
                    content: 'Unidade id ' + response.id + ' salva com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: Setor) => [
                    new UnidadeEditActions.SaveUnidadeSuccess(),
                    new UnidadesListActions.ReloadUnidades(),
                    new AddData<Setor>({data: [response], schema: setorSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'unidade',
                        content: 'Erro ao salvar a unidade!',
                        status: 2, // erro
                    }));
                    return of(new UnidadeEditActions.SaveUnidadeFailed(err));
                })
            )
        })
    ));
    /**
     * Save Setor Success
     */
    saveUnidadeSuccess: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<UnidadeEditActions.SaveUnidadeSuccess>(UnidadeEditActions.SAVE_UNIDADE_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.unidadeHandle),'listar')]).then();
        })
    ), {dispatch: false});

    /**
     *
     * @param _actions
     * @param _setorService
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _setorService: SetorService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
