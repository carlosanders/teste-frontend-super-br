import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AfastamentoEditActions from '../actions/afastamento-edit.actions';
import * as AfastamentoListActions from '../../../afastamento-list/store/actions/afastamento-list.actions';

import {AfastamentoService} from '@cdk/services/afastamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {afastamento as afastamentoSchema} from '@cdk/normalizr';
import {Afastamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class AfastamentoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _afastamentoService: AfastamentoService,
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
     * Get Afastamento with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getAfastamento: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.GetAfastamento>(AfastamentoEditActions.GET_AFASTAMENTO),
                switchMap(action => this._afastamentoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]))),
                switchMap(response => [
                    new AddData<Afastamento>({data: response['entities'], schema: afastamentoSchema}),
                    new AfastamentoEditActions.GetAfastamentoSuccess({
                        loaded: {
                            id: 'afastamentoHandle',
                            value: this.routerState.params.afastamentoHandle
                        },
                        afastamentoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AfastamentoEditActions.GetAfastamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Afastamento
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveAfastamento: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.SaveAfastamento>(AfastamentoEditActions.SAVE_AFASTAMENTO),
                switchMap(action => this._afastamentoService.save(action.payload).pipe(
                        mergeMap((response: Afastamento) => [
                            new AfastamentoEditActions.SaveAfastamentoSuccess(),
                            new AfastamentoListActions.ReloadAfastamentos(),
                            new AddData<Afastamento>({data: [response], schema: afastamentoSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AfastamentoEditActions.SaveAfastamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Afastamento Success
     */
    @Effect({dispatch: false})
    saveAfastamentoSuccess: any =
        this._actions
            .pipe(
                ofType<AfastamentoEditActions.SaveAfastamentoSuccess>(AfastamentoEditActions.SAVE_AFASTAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.afastamentoHandle), 'listar')]).then();
                })
            );
}
