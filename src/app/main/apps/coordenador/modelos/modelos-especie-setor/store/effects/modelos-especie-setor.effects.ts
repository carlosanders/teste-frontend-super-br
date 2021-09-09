import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap} from 'rxjs/operators';

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
     * Get Modelo with router parameters
     *
     * @type {Observable<any>}
     */
    getModelo: any = createEffect(() => this._actions.pipe(
            ofType<ModelosEspecieSetorActions.GetModelo>(ModelosEspecieSetorActions.GET_MODELO),
            switchMap(action => this._modeloService.get(
                action.payload.id,
                JSON.stringify([
                    'populateAll',
                    'documento.componentesDigitais',
                    'modalidadeModelo',
                    'vinculacoesModelos',
                    'vinculacoesModelos.setor',
                    'vinculacoesModelos.modalidadeOrgaoCentral',
                ]),
                JSON.stringify({isAdmin: true})
            )),
            switchMap(response => [
                new AddData<Modelo>({data: [response], schema: modeloSchema}),
                new ModelosEspecieSetorActions.GetModeloSuccess({
                    loaded: {
                        id: 'modeloHandle',
                        value: this.routerState.params.modeloHandle
                    },
                    modeloId: this.routerState.params.modeloHandle
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new ModelosEspecieSetorActions.GetModeloFailed(err));
            })
        )
    );

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
