import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

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
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

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
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo',
                    content: 'Salvando o modelo ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._modeloService.save(action.payload.modelo).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modelo',
                                content: 'Modelo id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Modelo) => [
                            new ModeloEditActions.SaveModeloSuccess(),
                            new GetDocumento(),
                            new AddData<Modelo>({data: [response], schema: modeloSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modelo',
                                content: 'Erro ao salvar o modelo!',
                                status: 2, // erro
                            }));
                            return of(new ModeloEditActions.SaveModeloFailed(err));
                        })
                    )
                })
            );
}
