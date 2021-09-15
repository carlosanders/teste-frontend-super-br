import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

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
    /**
     * Get VinculacaoRepositorio with router parameters
     *
     * @type {Observable<any>}
     */
    getRepositorioEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
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
        catchError((err) => {
            console.log(err);
            return of(new RepositoriosEspecieSetorEditActions.GetRepositorioEspecieSetorFailed(err));
        })
    ));
    /**
     * Save VinculacaoRepositorio
     *
     * @type {Observable<any>}
     */
    saveRepositorioEspecieSetor: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetor>(RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'tese espécie de setor',
            content: 'Vinculando a espécie de setor id ' + action.payload.vinculacaoRepositorio.especieSetor.id + ' à tese id '
                + action.payload.vinculacaoRepositorio.repositorio.id + '.',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoRepositorioService.save(action.payload.vinculacaoRepositorio).pipe(
            tap(() => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'tese espécie de setor',
                content: 'Espécie de setor id ' + action.payload.vinculacaoRepositorio.especieSetor.id + ' vinculada à tese id '
                    + action.payload.vinculacaoRepositorio.repositorio.id + ' com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: VinculacaoRepositorio) => [
                new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorSuccess(),
                new RepositoriosEspecieSetorListActions.ReloadRepositoriosEspecieSetor(),
                new AddData<VinculacaoRepositorio>({data: [response], schema: vinculacaoRepositorioSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'tese espécie de setor',
                    content: 'Erro ao vincular a tese e a espécie de setor!',
                    status: 2, // erro
                }));
                return of(new RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorFailed(err));
            })
        ))
    ));
    /**
     * Save VinculacaoRepositorio Success
     */
    saveRepositorioEspecieSetorSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RepositoriosEspecieSetorEditActions.SaveRepositorioEspecieSetorSuccess>(RepositoriosEspecieSetorEditActions.SAVE_REPOSITORIO_ESPECIE_SETOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.repositorioEspecieSetorHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoRepositorioService: VinculacaoRepositorioService,
        private _store: Store<State>,
        private _loginService: LoginService,
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
