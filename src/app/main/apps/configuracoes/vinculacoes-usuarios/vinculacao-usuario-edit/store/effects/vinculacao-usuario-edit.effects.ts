import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as VinculacaoUsuarioEditActions from '../actions/vinculacao-usuario-edit.actions';
import * as VinculacaoUsuarioListActions
    from '../../../vinculacao-usuario-list/store/actions/vinculacao-usuario-list.actions';

import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoUsuario as vinculacaoUsuarioSchema} from '@cdk/normalizr';
import {VinculacaoUsuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class VinculacaoUsuarioEditEffect {
    routerState: any;
    /**
     * Get VinculacaoUsuario with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoUsuario: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoUsuarioEditActions.GetVinculacaoUsuario>(VinculacaoUsuarioEditActions.GET_VINCULACAO_USUARIO),
        switchMap(action => this._vinculacaoUsuarioService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll'
            ]))),
        switchMap(response => [
            new AddData<VinculacaoUsuario>({data: response['entities'], schema: vinculacaoUsuarioSchema}),
            new VinculacaoUsuarioEditActions.GetVinculacaoUsuarioSuccess({
                loaded: {
                    id: 'vinculacaoUsuarioHandle',
                    value: this.routerState.params.vinculacaoUsuarioHandle
                },
                vinculacaoUsuarioId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new VinculacaoUsuarioEditActions.GetVinculacaoUsuarioFailed(err));
        })
    ));
    /**
     * Save VinculacaoUsuario
     *
     * @type {Observable<any>}
     */
    saveVinculacaoUsuario: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoUsuarioEditActions.SaveVinculacaoUsuario>(VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'assessor',
            content: 'Salvando o assessor ...',
            status: 0, // carregando
        }))),
        switchMap(action => this._vinculacaoUsuarioService.save(action.payload.vinculacaoUsuario).pipe(
            tap(response =>
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assessor',
                    content: 'Assessor id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))
            ),
            mergeMap((response: VinculacaoUsuario) => [
                new VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioSuccess(),
                new VinculacaoUsuarioListActions.ReloadVinculacoesUsuarios(),
                new AddData<VinculacaoUsuario>({data: [response], schema: vinculacaoUsuarioSchema})
            ]),
            catchError((err) => {
                console.log(err);
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'assessor',
                    content: 'Erro ao salvar o assessor!',
                    status: 2, // erro
                }));
                return of(new VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioFailed(err));
            })
        ))
    ));
    /**
     * Save VinculacaoUsuario Success
     */
    saveVinculacaoUsuarioSuccess: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoUsuarioEditActions.SaveVinculacaoUsuarioSuccess>(VinculacaoUsuarioEditActions.SAVE_VINCULACAO_USUARIO_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.vinculacaoUsuarioHandle), 'listar')]).then();
        })
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _vinculacaoUsuarioService: VinculacaoUsuarioService,
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
