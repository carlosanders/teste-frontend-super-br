import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as GrupoContatoEditActions from '../actions/grupo-contato-edit.actions';
import * as GrupoContatoListActions from '../../../grupo-contato-list/store/actions/grupo-contato-list.actions';

import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {grupoContato as grupoContatoSchema} from '@cdk/normalizr';
import {GrupoContato} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class GrupoContatoEditEffect {
    routerState: any;
    /**
     * Get GrupoContato with router parameters
     *
     * @type {Observable<any>}
     */
    getGrupoContato: any = createEffect(() => this._actions.pipe(
        ofType<GrupoContatoEditActions.GetGrupoContato>(GrupoContatoEditActions.GET_GRUPO_CONTATO),
        switchMap(action => this._grupoContatoService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<GrupoContato>({data: response['entities'], schema: grupoContatoSchema}),
            new GrupoContatoEditActions.GetGrupoContatoSuccess({
                loaded: {
                    id: 'grupoContatoHandle',
                    value: this.routerState.params.grupoContatoHandle
                },
                grupoContatoId: response['entities'][0].id
            })
        ]),
        catchError(err => of(new GrupoContatoEditActions.GetGrupoContatoFailed(err)))
    ));
    /**
     * Save GrupoContato
     *
     * @type {Observable<any>}
     */
    saveGrupoContato: any = createEffect(() => this._actions.pipe(
        ofType<GrupoContatoEditActions.SaveGrupoContato>(GrupoContatoEditActions.SAVE_GRUPO_CONTATO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'grupo de contato',
            content: 'Salvando o grupo de contato ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._grupoContatoService.save(action.payload.grupoContato).pipe(
            tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                id: action.payload.operacaoId,
                type: 'grupo de contato',
                content: 'Grupo de contato id ' + response.id + ' salvo com sucesso.',
                status: 1, // sucesso
            }))),
            mergeMap((response: GrupoContato) => [
                new GrupoContatoEditActions.SaveGrupoContatoSuccess(),
                new GrupoContatoListActions.ReloadGrupoContato(),
                new AddData<GrupoContato>({data: [response], schema: grupoContatoSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'grupo de contato',
                    content: 'Erro ao salvar o grupoContato!',
                    status: 2, // erro
                }));
                return of(new GrupoContatoEditActions.SaveGrupoContatoFailed(err));
            })
        ))
    ));
    /**
     * Save GrupoContato Success
     */
    saveGrupoContatoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<GrupoContatoEditActions.SaveGrupoContatoSuccess>(GrupoContatoEditActions.SAVE_GRUPO_CONTATO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.grupoContatoHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _grupoContatoService: GrupoContatoService,
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
