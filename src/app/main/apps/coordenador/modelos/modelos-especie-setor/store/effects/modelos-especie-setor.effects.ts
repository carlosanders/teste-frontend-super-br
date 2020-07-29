import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

import * as ModelosEspecieSetorActions from '../actions/modelos-especie-setor.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';

@Injectable()
export class ModelosEspecieSetorEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _modeloService
     * @param _store
     * @param _router
     */
    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        private _store: Store<State>,
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
                ofType<ModelosEspecieSetorActions.GetModelo>(ModelosEspecieSetorActions.GET_MODELO),
                switchMap((action) => {
                    return this._modeloService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'documento',
                            'documento.componentesDigitais',
                            'template',
                            'modalidadeModelo',
                            'vinculacoesModelos',
                            'vinculacoesModelos.setor',
                            'vinculacoesModelos.orgaoCentral',
                        ]));
                }),
                switchMap(response => [
                    new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                    new ModelosEspecieSetorActions.GetModeloSuccess({
                        loaded: {
                            id: 'modeloHandle',
                            value: this.routerState.params.modeloHandle
                        },
                        modeloId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModelosEspecieSetorActions.GetModeloFailed(err));
                    return caught;
                })
            );
}
