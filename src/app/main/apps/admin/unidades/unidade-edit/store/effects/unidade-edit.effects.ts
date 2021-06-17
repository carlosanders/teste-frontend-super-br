import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

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

@Injectable()
export class UnidadeEditEffects {
    routerState: any;

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
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Setor with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getUnidade: any =
        this._actions
            .pipe(
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
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UnidadeEditActions.GetUnidadeFailed(err));
                    return caught;
                })
            );

    /**
     * Save Setor
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveUnidade: any =
        this._actions
            .pipe(
                ofType<UnidadeEditActions.SaveUnidade>(UnidadeEditActions.SAVE_UNIDADE),
                switchMap((action) => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._setorService.save(action.payload, context).pipe(
                        mergeMap((response: Setor) => [
                            new UnidadeEditActions.SaveUnidadeSuccess(),
                            new UnidadesListActions.ReloadUnidades(),
                            new AddData<Setor>({data: [response], schema: setorSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new UnidadeEditActions.SaveUnidadeFailed(err));
                    return caught;
                })
            );

    /**
     * Save Setor Success
     */
    @Effect({dispatch: false})
    saveUnidadeSuccess: any =
        this._actions
            .pipe(
                ofType<UnidadeEditActions.SaveUnidadeSuccess>(UnidadeEditActions.SAVE_UNIDADE_SUCCESS),
                tap(() => {
                    this._router.navigate([
                        this.routerState.url.replace(
                            ('editar/' + this.routerState.params.unidadeHandle),
                            'listar'
                        )
                    ]).then();
                })
            );
}
