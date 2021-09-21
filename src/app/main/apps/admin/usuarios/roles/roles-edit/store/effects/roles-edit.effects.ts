import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, filter, mergeMap, switchMap, tap} from 'rxjs/operators';

import * as RoleEditActions from '../actions/roles-edit.actions';

import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {vinculacaoRole as roleSchema} from '@cdk/normalizr';
import {VinculacaoRole} from '@cdk/models/vinculacao-role.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as VinculacaoRolesListActions from "../../../roles-list/store/actions";

@Injectable()
export class RolesEditEffects {
    routerState: any;
    constructor(
        private _actions: Actions,
        private _roleService: VinculacaoRoleService,
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

    /**
     * Get Role with router parameters
     *
     * @type {Observable<any>}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    getRole: any = createEffect(() => this._actions.pipe(
        ofType<RoleEditActions.GetRole>(RoleEditActions.GET_ROLE),
        switchMap(action => this._roleService.query(
            JSON.stringify(action.payload),
            1,
            0,
            JSON.stringify({}),
            JSON.stringify([
                'populateAll',
                'colaborador.usuario',
            ]))),
        switchMap(response => [
            new AddData<VinculacaoRole>({data: response['entities'], schema: roleSchema}),
            new RoleEditActions.GetRoleSuccess({
                loaded: {
                    id: 'roleHandle',
                    value: this.routerState.params.roleHandle
                },
                roleId: response['entities'][0].id
            })
        ]),
        catchError((err) => {
            console.log(err);
            return of(new RoleEditActions.GetRoleFailed(err));
        })
    ));

    /**
     * Save VinculacaoRole
     *
     * @type {Observable<any>}
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    saveVinculacaoRole: any = createEffect(() => this._actions.pipe(
        ofType<RoleEditActions.SaveRole>(RoleEditActions.SAVE_ROLE),
        tap(action => this._store.dispatch(new OperacoesActions.Operacao({
            id: action.payload.operacaoId,
            type: 'vinculacao-role',
            content: 'Salvando a vinculação role ...',
            status: 0, // carregando
        }))),
        mergeMap((action) => {
            const context = JSON.stringify({isAdmin: true});
            return this._roleService.save(action.payload.role, context).pipe(
                tap(response => this._store.dispatch(new OperacoesActions.Operacao({
                    id: action.payload.operacaoId,
                    type: 'vinculacao-role',
                    content: 'VinculacaoRole id ' + response.id + ' salvo com sucesso.',
                    status: 1, // sucesso
                }))),
                mergeMap((response: VinculacaoRole) => [
                    new RoleEditActions.SaveRoleSuccess(),
                    new VinculacaoRolesListActions.ReloadVinculacaoRoles(),
                    new AddData<VinculacaoRole>({data: [response], schema: roleSchema})
                ]),
                catchError((err) => {
                    console.log(err);
                    this._store.dispatch(new OperacoesActions.Operacao({
                        id: action.payload.operacaoId,
                        type: 'vinculacao-role',
                        content: 'Erro ao salvar a vinculacao-role!',
                        status: 2, // erro
                    }));
                    return of(new RoleEditActions.SaveRoleFailed(err));
                })
            );
        })
    ));
    /**
     * Save VinculacaoRole Success
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    saveVinculacaoRoleSuccess: any = createEffect(() => this._actions.pipe(
        ofType<RoleEditActions.SaveRoleSuccess>(RoleEditActions.SAVE_ROLE_SUCCESS),
        tap(() => {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.roleHandle), 'listar')]).then();
        })
    ), {dispatch: false});
}
