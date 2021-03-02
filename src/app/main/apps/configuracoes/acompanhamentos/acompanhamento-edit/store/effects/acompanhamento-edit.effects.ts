import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as AcompanhamentoEditActions from '../actions/acompanhamento-edit.actions';
import * as AcompanhamentoListActions from '../../../acompanhamento-list/store/actions/acompanhamento-list.actions';

import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {compartilhamento as comparilhamentoSchema} from '@cdk/normalizr';
import {Compartilhamento} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {GetAcompanhamentos} from '../../../acompanhamento-list/store/actions/acompanhamento-list.actions';

@Injectable()
export class AcompanhamentoEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _acompanhamentoService: AcompanhamentoService,
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
     * Get Acompanhamento with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getAcompanhamento: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoEditActions.GetAcompanhamento>(AcompanhamentoEditActions.GET_ACOMPANHAMENTO),
                switchMap((action) => {
                    return this._acompanhamentoService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll'
                        ]));
                }),
                switchMap(response => [
                    new AddData<Compartilhamento>({data: response['entities'], schema: comparilhamentoSchema}),
                    new AcompanhamentoEditActions.GetAcompanhamentoSuccess({
                        loaded: {
                            id: 'targetHandle',
                            value: this.routerState.params.targetHandle
                        },
                        acompanhamentoId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AcompanhamentoEditActions.GetAcompanhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Acompanhamento
     * @type {Observable<any>}
     */
    @Effect()
    saveAcompanhamento: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoEditActions.SaveAcompanhamento>(AcompanhamentoEditActions.SAVE_ACOMPANHAMENTO),
                switchMap((action) => {
                    return this._acompanhamentoService.save(action.payload).pipe(
                        mergeMap((response: Compartilhamento) => [
                            new AcompanhamentoEditActions.SaveAcompanhamentoSuccess(),
                            new AcompanhamentoListActions.ReloadAcompanhamentos(),
                            new GetAcompanhamentos([]),
                            new AddData<Compartilhamento>({data: [response], schema: comparilhamentoSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new AcompanhamentoEditActions.SaveAcompanhamentoFailed(err));
                    return caught;
                })
            );

    /**
     * Save Acompanhamento Success
     */
    @Effect({dispatch: false})
    saveAcompanhamentoSuccess: any =
        this._actions
            .pipe(
                ofType<AcompanhamentoEditActions.SaveAcompanhamentoSuccess>(AcompanhamentoEditActions.SAVE_ACOMPANHAMENTO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.targetHandle), 'listar')]).then();
                })
            );
}