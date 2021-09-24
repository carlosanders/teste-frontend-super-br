import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as VinculacaoRolesListActions from '../actions';

import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {AddData, UpdateData} from '@cdk/ngrx-normalizr';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';
import {vinculacaoRole as roleSchema} from '@cdk/normalizr';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from '../../../../../../../../store/actions/operacoes.actions';

@Injectable()
export class VinculacaoRolesListEffects {
    routerState: any;
    /**
     * Get VinculacaoRoles with router parameters
     *
     * @type {Observable<any>}
     */
    getVinculacaoRoles: any = createEffect(() => this._actions.pipe(
        ofType<VinculacaoRolesListActions.GetVinculacaoRoles>(VinculacaoRolesListActions.GET_ROLES),
        switchMap(action => this._roleService.query(
            JSON.stringify({
                ...action.payload.filter,
                ...action.payload.gridFilter,
            }),
            action.payload.limit,
            action.payload.offset,
            JSON.stringify(action.payload.sort),
            JSON.stringify(action.payload.populate),
            JSON.stringify(action.payload.context)).pipe(
            mergeMap(response => [
                new AddData<VinculacaoRole>({data: response['entities'], schema: roleSchema}),
                new VinculacaoRolesListActions.GetVinculacaoRolesSuccess({
                    entitiesId: response['entities'].map(role => role.id),
                    loaded: {
                        id: 'usuarioHandle',
                        value: this.routerState.params.usuarioHandle
                    },
                    total: response['total']
                })
            ]),
            catchError((err) => {
                console.log(err);
                return of(new VinculacaoRolesListActions.GetVinculacaoRolesFailed(err));
            })
        ))
    ));
    /**
     * Delete VinculacaoRole
     *
     * @type {Observable<any>}
     */
    deleteVinculacaoRole: Observable<VinculacaoRolesListActions.VinculacaoRolesListActionsAll> = createEffect(() => this._actions.pipe(
        ofType<VinculacaoRolesListActions.DeleteVinculacaoRole>(VinculacaoRolesListActions.DELETE_ROLE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'role',
            content: 'Apagando role id ' + action.payload.roleId + '...',
            status: 0, // carregando
            lote: action.payload.loteId
        }))),
        mergeMap(action => this._roleService.destroy(action.payload.roleId).pipe(
            map((response) => {
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'role',
                    content: 'VinculacaoRole id ' + action.payload.roleId + ' deletado com sucesso.',
                    status: 1, // sucesso
                    lote: action.payload.loteId
                }));
                this._store.dispatch(new UpdateData<VinculacaoRole>({
                    id: response.id,
                    schema: roleSchema,
                    changes: {apagadoEm: response.apagadoEm}
                }));
                return new VinculacaoRolesListActions.DeleteVinculacaoRoleSuccess(response.id);
            }),
            catchError((err) => {
                const payload = {
                    id: action.payload.roleId,
                    error: err
                };
                this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'role',
                    content: 'Erro ao apagar role id ' + action.payload.roleId + '!',
                    status: 2, // erro
                    lote: action.payload.loteId
                }));
                console.log(err);
                return of(new VinculacaoRolesListActions.DeleteVinculacaoRoleFailed(payload));
            })
        ), 25)
    ));

    constructor(
        private _actions: Actions,
        private _roleService: VinculacaoRoleService,
        private _loginService: LoginService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
