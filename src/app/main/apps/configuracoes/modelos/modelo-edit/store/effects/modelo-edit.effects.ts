import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ModeloEditActions from '../actions/modelo-edit.actions';
import * as ModeloListActions from '../../../modelo-list/store/actions/modelo-list.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

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
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Modelo with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModelo: any =
        this._actions
            .pipe(
                ofType<ModeloEditActions.GetModelo>(ModeloEditActions.GET_MODELO),
                switchMap(action => this._modeloService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll'
                        ]),
                    )),
                switchMap(response => [
                    new AddData<Modelo>({data: [response], schema: modeloSchema}),
                    new ModeloEditActions.GetModeloSuccess({
                        loaded: {
                            id: 'modeloHandle',
                            value: this.routerState.params.modeloHandle
                        },
                        modeloId: this.routerState.params.modeloHandle
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
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveModelo: any =
        this._actions
            .pipe(
                ofType<ModeloEditActions.SaveModelo>(ModeloEditActions.SAVE_MODELO),
                tap(() => {
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'modelo',
                        content: 'Salvando a modelo ...',
                        status: 0, // carregando
                    }));
                }),
                switchMap(action => this._modeloService.save(action.payload).pipe(
                    tap(() =>
                        this._store.dispatch(new OperacoesActions.Operacao({
                            type: 'modelo',
                            content: 'Modelo salva com sucesso.',
                            status: 1, // sucesso
                        }))),
                    mergeMap((response: Modelo) => [
                        new ModeloEditActions.SaveModeloSuccess(),
                        new ModeloListActions.ReloadModelos(),
                        new AddData<Modelo>({data: [response], schema: modeloSchema})
                    ])
                )),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        type: 'modelo',
                        content: 'Erro ao salvar a modelo!',
                        status: 2, // erro
                    }));
                    return of(this._store.dispatch(new ModeloEditActions.SaveModeloFailed(err)));
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
