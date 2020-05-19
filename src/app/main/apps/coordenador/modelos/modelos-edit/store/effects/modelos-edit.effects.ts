import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, tap, switchMap} from 'rxjs/operators';

import * as ModeloEditActions from '../actions/modelos-edit.actions';
import * as ModeloListActions from '../../../modelos-list/store/actions/modelos-list.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr/modelo.schema';
import {Modelo} from '@cdk/models/modelo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';

@Injectable()
export class ModeloEditEffect {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
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
     * Get Modelo with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    getModelo: any =
        this._actions
            .pipe(
                ofType<ModeloEditActions.GetModelo>(ModeloEditActions.GET_MODELO),
                switchMap((action) => {
                    return this._modeloService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'vinculacoesModelos',
                            'vinculacoesModelos.setor',
                            'vinculacoesModelos.usuario',
                            'vinculacoesModelos.orgaoCentral',
                        ]));
                }),
                switchMap(response => [
                    new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                    new ModeloEditActions.GetModeloSuccess({
                        loaded: {
                            id: 'modeloHandle',
                            value: this.routerState.params.modeloHandle
                        },
                        modeloId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModeloEditActions.GetModeloFailed(err));
                    return caught;
                })
            );

    /**
     * Save Modelo
     * @type {Observable<any>}
     */
    @Effect()
    saveModelo: any =
        this._actions
            .pipe(
                ofType<ModeloEditActions.SaveModelo>(ModeloEditActions.SAVE_MODELO),
                switchMap((action) => {
                    return this._modeloService.save(action.payload).pipe(
                        mergeMap((response: Modelo) => [
                            new ModeloEditActions.SaveModeloSuccess(),
                            new ModeloListActions.ReloadModelos(),
                            new AddData<Modelo>({data: [response], schema: modeloSchema})
                        ])
                    );
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModeloEditActions.SaveModeloFailed(err));
                    return caught;
                })
            );

    /**
     * Save Modelo Success
     */
    @Effect({dispatch: false})
    saveModeloSuccess: any =
        this._actions
            .pipe(
                ofType<ModeloEditActions.SaveModeloSuccess>(ModeloEditActions.SAVE_MODELO_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.modeloHandle), 'listar')]).then();
                })
            );
}
