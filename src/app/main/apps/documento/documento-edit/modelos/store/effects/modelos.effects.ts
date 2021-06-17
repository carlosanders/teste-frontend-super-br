import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModelosActions from '../actions/modelos.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {ComponenteDigital, Modelo} from '@cdk/models';
import {modelo as modeloSchema} from '@cdk/normalizr';
import * as fromStore from '../';

@Injectable()
export class ModelosEffects {
    routerState: any;
    currentComponenteDigital: ComponenteDigital;

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        private _store: Store<State>
    ) {
        this._store.pipe(select(fromStore.getCurrentComponenteDigital))
            .subscribe((componenteDigital) => {
                this.currentComponenteDigital = componenteDigital;
            });
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Get Modelos with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModelos: any =
        this._actions
            .pipe(
                ofType<ModelosActions.GetModelos>(ModelosActions.GET_MODELOS),
                switchMap((action) => {
                    const filter: any = {
                        orX: []
                    };
                    if (action.payload.filter?.orX) {
                        action.payload.filter.orX.forEach((filtro) => {
                            filter.orX.push({
                                ...filtro,
                                id: 'neq:' + this.currentComponenteDigital.modelo.id
                            });
                        });
                    }
                    let mode = 'query';
                    if (filter.hasOwnProperty('documento.componentesDigitais.conteudo')) {
                        mode = 'search';
                    }
                    return this._modeloService[`${mode}`](
                        JSON.stringify({
                            ...filter,
                            ...action.payload.gridFilter,
                        }),
                        action.payload.limit,
                        action.payload.offset,
                        JSON.stringify(action.payload.sort),
                        JSON.stringify(action.payload.populate));
                }),
                mergeMap(response => [
                    new AddData<Modelo>({data: response['entities'], schema: modeloSchema}),
                    new ModelosActions.GetModelosSuccess({
                        entitiesId: response['entities'].map(modelo => modelo.id),
                        loaded: {
                            id: 'documentoHandle',
                            value: this.routerState.params.documentoHandle
                        },
                        total: response['total']
                    })
                ]),
                catchError((err, caught) => {
                    console.log (err);
                    this._store.dispatch(new ModelosActions.GetModelosFailed(err));
                    return caught;
                })

            );
}
