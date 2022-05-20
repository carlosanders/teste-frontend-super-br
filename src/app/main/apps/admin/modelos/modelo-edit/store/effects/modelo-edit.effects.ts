import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as AdminModeloEditActions from '../actions/modelo-edit.actions';
import * as ModeloListActions from '../../../modelo-list/store/actions/modelo-list.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class AdminModeloEditEffect {
    routerState: any;

    /**
     * Get Modelo with router parameters
     *
     * @type {Observable<any>}
     */
    getModelo: any = createEffect(() => this._actions.pipe(
        ofType<AdminModeloEditActions.GetModelo>(AdminModeloEditActions.GET_MODELO),
        switchMap(action => this._modeloService.get(
            action.payload.id,
            JSON.stringify([
                'populateAll'
            ]),
        )),
        switchMap(response => [
            new AddData<Modelo>({data: [response], schema: modeloSchema}),
            new AdminModeloEditActions.GetModeloSuccess({
                loaded: {
                    id: 'modeloHandle',
                    value: this.routerState.params.modeloHandle
                },
                modeloId: this.routerState.params.modeloHandle
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new AdminModeloEditActions.GetModeloFailed(err));
        })
    ));

    /**
     * Save Modelo
     *
     * @type {Observable<any>}
     */
    saveModelo: any = createEffect(() => this._actions.pipe(
        ofType<AdminModeloEditActions.SaveModelo>(AdminModeloEditActions.SAVE_MODELO),
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
                new AdminModeloEditActions.SaveModeloSuccess(),
                new ModeloListActions.ReloadModelos(),
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
                return of(new AdminModeloEditActions.SaveModeloFailed(err));
            })
        ))
    ));

    /**
     * Save Modelo Success
     */
    saveModeloSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AdminModeloEditActions.SaveModeloSuccess>(AdminModeloEditActions.SAVE_MODELO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.modeloHandle), 'listar')]).then();
        })
    ), {dispatch: false});

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
