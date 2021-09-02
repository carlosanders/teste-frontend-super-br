import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as ModelosEspecieSetorEditActions from '../actions/modelos-especie-setor-edit.actions';
import * as ModelosEspecieSetorListActions from '../../../modelos-especie-setor-list/store/actions';

import {VinculacaoModeloService} from '@cdk/services/vinculacao-modelo.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoModelo as vinculacaoModeloSchema} from '@cdk/normalizr';
import {VinculacaoModelo} from '@cdk/models/vinculacao-modelo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ModelosEspecieSetorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoModeloService: VinculacaoModeloService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
     * Get VinculacaoModelo with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getModeloEspecieSetor: any =
        this._actions
            .pipe(
                ofType<ModelosEspecieSetorEditActions.GetModeloEspecieSetor>(ModelosEspecieSetorEditActions.GET_MODELO_ESPECIE_SETOR),
                switchMap(action => this._vinculacaoModeloService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'especieSetor.generoSetor',
                        ]))),
                switchMap(response => [
                    new AddData<VinculacaoModelo>({data: response['entities'], schema: vinculacaoModeloSchema}),
                    new ModelosEspecieSetorEditActions.GetModeloEspecieSetorSuccess({
                        loaded: {
                            id: 'modeloEspecieSetorHandle',
                            value: this.routerState.params.modeloEspecieSetorHandle
                        },
                        vinculacaoModeloId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new ModelosEspecieSetorEditActions.GetModeloEspecieSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoModelo
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveModeloEspecieSetor: any =
        this._actions
            .pipe(
                ofType<ModelosEspecieSetorEditActions.SaveModeloEspecieSetor>(ModelosEspecieSetorEditActions.SAVE_MODELO_ESPECIE_SETOR),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'modelo',
                    content: 'Salvando o modelo ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    return this._vinculacaoModeloService.save(action.payload.vinculacaoModelo).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modelo',
                                content: 'Modelo id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: VinculacaoModelo) => [
                            new ModelosEspecieSetorEditActions.SaveModeloEspecieSetorSuccess(),
                            new ModelosEspecieSetorListActions.ReloadModelosEspecieSetor(),
                            new AddData<VinculacaoModelo>({data: [response], schema: vinculacaoModeloSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'modelo',
                                content: 'Erro ao salvar o modelo!',
                                status: 2, // erro
                            }));
                            return of(new ModelosEspecieSetorEditActions.SaveModeloEspecieSetorFailed(err));
                        })
                    )
                })
            );

    /**
     * Save VinculacaoModelo Success
     */
    @Effect({dispatch: false})
    saveModeloEspecieSetorSuccess: any =
        this._actions
            .pipe(
                ofType<ModelosEspecieSetorEditActions.SaveModeloEspecieSetorSuccess>(ModelosEspecieSetorEditActions.SAVE_MODELO_ESPECIE_SETOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.modeloEspecieSetorHandle), 'listar')]).then();
                })
            );
}
