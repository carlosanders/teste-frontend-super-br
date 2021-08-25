import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RepositoriosEspecieSetorEditActions from '../actions/repositorios-especie-setor-edit.actions';
import * as RepositoriosEspecieSetorListActions from '../../../repositorios-especie-setor-list/store/actions';

import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoRepositorio as vinculacaoRepositorioSchema} from '@cdk/normalizr';
import {VinculacaoRepositorio} from '@cdk/models/vinculacao-repositorio.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class RepositoriosEspecieSetorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _vinculacaoRepositorioService: VinculacaoRepositorioService,
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
     * Get VinculacaoRepositorio with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getRepositorioEspecieSetor: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorEditActions.GetRepositorioEspecieSetor>(RepositoriosEspecieSetorEditActions.GET_REPOSITORIO_ESPECIE_SETOR),
                switchMap(action => this._vinculacaoRepositorioService.query(
                        JSON.stringify(action.payload),
                        1,
                        0,
                        JSON.stringify({}),
                        JSON.stringify([
                            'populateAll',
                            'especieSetor.generoSetor'
                        ]))),
                switchMap(response => [
                    new AddData<VinculacaoRepositorio>({data: response['entities'], schema: vinculacaoRepositorioSchema}),
                    new RepositoriosEspecieSetorEditActions.GetRepositorioEspecieSetorSuccess({
                        loaded: {
                            id: 'repositorioEspecieSetorHandle',
                            value: this.routerState.params.repositorioEspecieSetorHandle
                        },
                        vinculacaoRepositorioId: response['entities'][0].id
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RepositoriosEspecieSetorEditActions.GetRepositorioEspecieSetorFailed(err));
                    return caught;
                })
            );

    /**
     * Save VinculacaoRepositorio
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveRepositorioEspecieSetor: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetor>(RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'repositório espécie de setor',
                    content: 'Salvando o repositório espécie de setor ...',
                    status: 0, // carregando
                }))),
                tap(action => (console.log(action))),
                switchMap(action => {
                    return this._vinculacaoRepositorioService.save(action.payload.vinculacaoRepositorio).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'repositório espécie de setor',
                                content: 'Repositório espécie de setor id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: VinculacaoRepositorio) => [
                            new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorSuccess(),
                            new RepositoriosEspecieSetorListActions.ReloadRepositoriosEspecieSetor(),
                            new AddData<VinculacaoRepositorio>({data: [response], schema: vinculacaoRepositorioSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'repositório espécie de setor',
                                content: 'Erro ao salvar o repositório espécie de setor!',
                                status: 2, // erro
                            }));
                            return of(new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorFailed(err));
                        })
                    )
                })
            );

    /**
     * Save VinculacaoRepositorio Success
     */
    @Effect({dispatch: false})
    saveRepositorioEspecieSetorSuccess: any =
        this._actions
            .pipe(
                ofType<RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorSuccess>(RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.repositorioEspecieSetorHandle), 'listar')]).then();
                })
            );
}
