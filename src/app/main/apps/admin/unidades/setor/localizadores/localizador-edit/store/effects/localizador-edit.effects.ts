import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RootLocalizadorEditActions from '../actions/localizador-edit.actions';
import * as RootLocalizadoresListActions from '../../../localizadores-list/store/actions/localizadores-list.actions';

import {LocalizadorService} from '@cdk/services/localizador.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {localizador as localizadorSchema} from '@cdk/normalizr';
import {Localizador} from '@cdk/models/localizador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class LocalizadorEditEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
        private _store: Store<State>,
        public _loginService: LoginService,
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
     * Get Localizador with router parameters
     *
     * @type {Observable<any>}
     */
    @Effect()
    getLocalizador: any =
        this._actions
            .pipe(
                ofType<RootLocalizadorEditActions.GetLocalizador>(RootLocalizadorEditActions.GET_LOCALIZADOR),
                switchMap(action => this._localizadorService.get(
                        action.payload.id,
                        JSON.stringify([
                            'populateAll'
                        ]),
                        JSON.stringify({isAdmin: true})
                    )),
                switchMap(response => [
                    new AddData<Localizador>({data: [response], schema: localizadorSchema}),
                    new RootLocalizadorEditActions.GetLocalizadorSuccess({
                        loaded: {
                            id: 'localizadorHandle',
                            value: this.routerState.params.localizadorHandle
                        },
                        localizadorId: this.routerState.params.localizadorHandle
                    })
                ]),
                catchError((err, caught) => {
                    console.log(err);
                    this._store.dispatch(new RootLocalizadorEditActions.GetLocalizadorFailed(err));
                    return caught;
                })
            );

    /**
     * Save Localizador
     *
     * @type {Observable<any>}
     */
    @Effect()
    saveLocalizador: any =
        this._actions
            .pipe(
                ofType<RootLocalizadorEditActions.SaveLocalizador>(RootLocalizadorEditActions.SAVE_LOCALIZADOR),
                tap((action) => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'localizador',
                    content: 'Salvando o localizador ...',
                    status: 0, // carregando
                }))),
                switchMap(action => {
                    const context = JSON.stringify({isAdmin: true});
                    return this._localizadorService.save(action.payload.localizador, context).pipe(
                        tap((response) =>
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'localizador',
                                content: 'Localizador id ' + response.id + ' salvo com sucesso.',
                                status: 1, // sucesso
                            }))
                        ),
                        mergeMap((response: Localizador) => [
                            new RootLocalizadorEditActions.SaveLocalizadorSuccess(),
                            new RootLocalizadoresListActions.ReloadLocalizadores(),
                            new AddData<Localizador>({data: [response], schema: localizadorSchema})
                        ]),
                        catchError((err) => {
                            console.log(err);
                            this._store.dispatch(new OperacoesActions.Operacao({
                                id: action.payload.operacaoId,
                                type: 'localizador',
                                content: 'Erro ao salvar o localizador!',
                                status: 2, // erro
                            }));
                            return of(new RootLocalizadorEditActions.SaveLocalizadorFailed(err));
                        })
                    )
                })
            );

    /**
     * Save Localizador Success
     */
    @Effect({dispatch: false})
    saveLocalizadorSuccess: any =
        this._actions
            .pipe(
                ofType<RootLocalizadorEditActions.SaveLocalizadorSuccess>(RootLocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS),
                tap(() => {
                    this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.localizadorHandle), 'listar')]).then();
                })
            );
}
