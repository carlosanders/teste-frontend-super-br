import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
     * Save Modelo
     *
     * @type {Observable<any>}
     */
    saveModelo: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<ModeloEditActions.SaveModelo>(ModeloEditActions.SAVE_MODELO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'modelo',
            content: 'Salvando o modelo ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._modeloService.save(action.payload.modelo).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'modelo',
                content: 'Modelo id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Modelo) => [
                new AddData<Modelo>({data: [response], schema: modeloSchema}),
                new ModeloEditActions.SaveModeloSuccess(),
                new GetDocumento()
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
        ))
    ));

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
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
