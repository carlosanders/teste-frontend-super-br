import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable} from 'rxjs';
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
                switchMap(action => this._vinculacaoRepositorioService.save(action.payload).pipe(
                        mergeMap((response: VinculacaoRepositorio) => [
                            new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorSuccess(),
                            new RepositoriosEspecieSetorListActions.ReloadRepositoriosEspecieSetor(),
                            new AddData<VinculacaoRepositorio>({data: [response], schema: vinculacaoRepositorioSchema})
                        ])
                    )),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorFailed(err));
                    return caught;
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
