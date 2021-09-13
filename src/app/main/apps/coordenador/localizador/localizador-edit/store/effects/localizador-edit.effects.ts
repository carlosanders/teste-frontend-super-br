import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as LocalizadorEditActions from '../actions/localizador-edit.actions';
import * as LocalizadorListActions from '../../../localizador-list/store/actions/localizador-list.actions';

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
export class LocalizadorEditEffect {
    routerState: any;
    /**
     * Get Localizador with router parameters
     *
     * @type {Observable<any>}
     */
    getLocalizador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LocalizadorEditActions.GetLocalizador>(LocalizadorEditActions.GET_LOCALIZADOR),
        switchMap(action => this._localizadorService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<Localizador>({data: response['entities'], schema: localizadorSchema}),
            new LocalizadorEditActions.GetLocalizadorSuccess({
                loaded: {
                    id: 'localizadorHandle',
                    value: this.routerState.params.localizadorHandle
                },
                localizadorId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new LocalizadorEditActions.GetLocalizadorFailed(err));
        })
    ));
    /**
     * Save Localizador
     *
     * @type {Observable<any>}
     */
    saveLocalizador: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<LocalizadorEditActions.SaveLocalizador>(LocalizadorEditActions.SAVE_LOCALIZADOR),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'localizador',
            content: 'Salvando o localizador ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._localizadorService.save(action.payload.localizador).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'localizador',
                content: 'Localizador id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: Localizador) => [
                new LocalizadorEditActions.SaveLocalizadorSuccess(),
                new LocalizadorListActions.ReloadLocalizadores(),
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
                return of(new LocalizadorEditActions.SaveLocalizadorFailed(err));
            })
        ))
    ));
    /**
     * Save Localizador Success
     */
    saveLocalizadorSuccess: any = createEffect(() => this._actions.pipe(
        ofType<LocalizadorEditActions.SaveLocalizadorSuccess>(LocalizadorEditActions.SAVE_LOCALIZADOR_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.localizadorHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _localizadorService: LocalizadorService,
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
