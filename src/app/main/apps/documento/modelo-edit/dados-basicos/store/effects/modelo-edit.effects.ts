import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ModeloEditActions from '../actions';

import {AddData} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Router} from '@angular/router';
import {Modelo} from '@cdk/models';
import {ModeloService} from '@cdk/services/modelo.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import {GetDocumento} from '../../../../store';

@Injectable()
export class ModeloEditEffects {
    routerState: any;

    /**
     *
     * @param _actions
     * @param _modeloService
     * @param _router
     * @param _store
     */
    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        private _router: Router,
        private _store: Store<State>
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
                            new AddData<Modelo>({data: [response], schema: modeloSchema}),
                            new GetDocumento(),
                            new OperacoesActions.Resultado({
                                type: 'modelo',
                                content: `Modelo id ${response.id} editado com sucesso!`,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log(err);
                            return of(new ModeloEditActions.SaveModeloFailed(err));
                        })
                    );
                })
            );
}
