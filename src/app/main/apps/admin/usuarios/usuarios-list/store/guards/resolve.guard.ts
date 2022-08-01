import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

import {select, Store} from '@ngrx/store';

import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '../';
import {getRouterState} from 'app/store/reducers';
import {UsuariosListAppState} from '../reducers';
import {LoginService} from 'app/main/auth/login/login.service';
import {
    TableDefinitionsService
} from '@cdk/components/table-definitions/table-definitions.service';
import {UsuariosListComponent} from '../../usuarios-list.component';
import {TableDefinitions} from '@cdk/components/table-definitions/table-definitions';

@Injectable()
export class ResolveGuard implements CanActivate {

    routerState: any;

    constructor(
        private _store: Store<UsuariosListAppState>,
        private _loginService: LoginService,
        private _tableDefinitionsService: TableDefinitionsService
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     * @returns
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }

    checkStore(): Observable<any> {
        return this._tableDefinitionsService
            .getTableDefinitions(
                this._tableDefinitionsService
                    .generateTableDeinitionIdentifier(UsuariosListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(
                switchMap((definitions) => this.getUsuarios(definitions))
            )
    }

    getUsuarios(definitions?: TableDefinitions): Observable<any> {
        return this._store.pipe(
            select(fromStore.getUsuariosListLoaded),
            tap((loaded: any) => {
                if (this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                        + this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['setorHandle'] !==
                        loaded.value)
                    || (this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['setorHandle'] !== loaded.value))
                    || (!this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                            + this.routerState.params['unidadeHandle'] !== loaded.value))
                    || (!this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                        (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] !==
                            loaded.value))) {

                    const params: any = {
                        filter: {
                            'colaborador.id': 'isNotNull'
                        },
                        gridFilter: {},
                        limit: definitions?.limit || 10,
                        offset: 0,
                        sort: definitions?.sort || {},
                        populate: [
                            'populateAll',
                            'colaborador',
                            'colaborador.cargo',
                            'colaborador.modalidadeColaborador'
                        ],
                        context: {
                            isAdmin: true
                        }
                    };

                    if (this.routerState.params.generoHandle === 'nacional' && !this.routerState.params.unidadeHandle) {
                        params.filter = {
                            ...params.filter,
                            'colaborador.lotacoes.setor.unidade.modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params['entidadeHandle']
                        };
                    }
                    if (!this.routerState.params.setorHandle &&
                        ((this.routerState.params.generoHandle === 'unidade') || (this.routerState.params.unidadeHandle))) {
                        const valor = this.routerState.params.unidadeHandle ?
                            this.routerState.params['unidadeHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'colaborador.lotacoes.setor.unidade.id': 'eq:' + valor
                        };
                    }
                    if (this.routerState.params.generoHandle === 'local' || this.routerState.params.setorHandle) {
                        const valor = this.routerState.params.setorHandle ?
                            this.routerState.params['setorHandle'] : this.routerState.params['entidadeHandle'];
                        params.filter = {
                            ...params.filter,
                            'colaborador.lotacoes.setor.id': 'eq:' + valor
                        };
                    }

                    this._store.dispatch(new fromStore.GetUsuarios(params));
                }
            }),
            filter((loaded: any) => (this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                    + this.routerState.params['unidadeHandle'] + '_' + this.routerState.params['setorHandle'] ===
                    loaded.value)
                || (this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                        + this.routerState.params['setorHandle'] === loaded.value))
                || (!this.routerState.params['setorHandle'] && this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] + '_'
                        + this.routerState.params['unidadeHandle'] === loaded.value))
                || (!this.routerState.params['setorHandle'] && !this.routerState.params['unidadeHandle'] &&
                    (this.routerState.params['generoHandle'] + '_' + this.routerState.params['entidadeHandle'] ===
                        loaded.value)))),
            take(1)
        );
    }
}
