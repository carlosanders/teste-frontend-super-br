import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ModeloEditActions from '../actions/modelos-edit.actions';
import * as ModeloListActions from '../../../modelos-list/store/actions/modelos-list.actions';

import {ModeloService} from '@cdk/services/modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {modelo as modeloSchema} from '@cdk/normalizr';
import {Modelo} from '@cdk/models/modelo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ModeloEditEffect {
    routerState: any;

    /**
     * Get Modelo with router parameters
     *
     * @type {Observable<any>}
     */
    getModelo: any = createEffect(() => this._actions.pipe(
        ofType<ModeloEditActions.GetModelo>(ModeloEditActions.GET_MODELO),
        switchMap(action => this._modeloService.get(
            action.payload.id,
            JSON.stringify([
                'populateAll',
                'vinculacoesModelos',
                'vinculacoesModelos.setor',
                'vinculacoesModelos.usuario',
                'vinculacoesModelos.modalidadeOrgaoCentral',
            ]),
            JSON.stringify({isAdmin: true}))),
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
        catchError((err) => {
            console.log(err);
            return of(new ModeloEditActions.GetModeloFailed(err));
        })
    ));

    /**
     * Save Modelo
     *
     * @type {Observable<any>}
     */
    saveModelo: any = createEffect(() => this._actions.pipe(
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
                new ModeloEditActions.SaveModeloSuccess(),
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
                return of(new ModeloEditActions.SaveModeloFailed(err));
            })
        ))
    ));

    /**
     * Save Modelo Success
     */
    saveModeloSuccess: any = createEffect(() => this._actions.pipe(
        ofType<ModeloEditActions.SaveModeloSuccess>(ModeloEditActions.SAVE_MODELO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.modeloHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _modeloService: ModeloService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
