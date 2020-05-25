import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as UnidadeEditActions from '../actions/unidade-edit.actions';
import * as UnidadesListActions from '../../../unidades-list/store/actions/unidades-list.actions';

import {SetorService} from '@cdk/services/setor.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {setor as setorSchema} from '@cdk/normalizr/setor.schema';
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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Setor with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getUnidade: any =
        this._actions
            .pipe(
                ofType<UnidadeEditActions.GetUnidade>(UnidadeEditActions.GET_UNIDADE),
                switchMap((action) => {
                    return this._setorService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({"isAdmin": true}));
                }),
                switchMap(response => [
                    new AddData<Setor>({data: response['entities'], schema: setorSchema}),
                    new UnidadeEditActions.GetUnidadeSuccess({
                        loaded: {
                            id: 'unidadeHandle',
                            value: this.routerState.params.unidadeHandle
                        },
                        setorId: response['entities'][0].id
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
     * @type {Observable<any>}
     */
    @Effect()
    saveUnidade: any =
        this._actions
            .pipe(
                ofType<UnidadeEditActions.SaveUnidade>(UnidadeEditActions.SAVE_UNIDADE),
                switchMap((action) => {
                    return this._setorService.save(action.payload).pipe(
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
