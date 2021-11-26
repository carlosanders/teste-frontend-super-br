import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import * as fromStoreAdmin from '../../roles/store';
import {VinculacaoRole, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';
import {CdkUtils} from '@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {StaticRoleService} from '@cdk/services/static-role.service';

@Component({
    selector: 'roles-edit',
    templateUrl: './roles-edit.component.html',
    styleUrls: ['./roles-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RolesEditComponent implements OnInit, OnDestroy {

    routerState: any;
    role$: Observable<VinculacaoRole>;
    role: VinculacaoRole;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    staticRoles: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _staticRoles
     */
    constructor(
        private _store: Store<fromStore.RoleEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _staticRoles: StaticRoleService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.role$ = this._store.pipe(select(fromStore.getRole));
        this.usuario$ = this._store.pipe(select(fromStoreAdmin.getUsuario));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this._staticRoles.getStaticRoles().subscribe(
            staticRoles => this.staticRoles = staticRoles
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.usuario$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(usuario => this.usuario = usuario);

        this.role$.pipe(
            filter(role => !!role),
            takeUntil(this._unsubscribeAll)
        ).subscribe(role => this.role = role);

        if (!this.role) {
            this.role = new VinculacaoRole();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        Object.entries(values.role).forEach(
            ([key, value]) => {
                const roleObj = new VinculacaoRole();
                roleObj.role = value.toString();
                roleObj.usuario = this.usuario;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveRole({
                    role: roleObj,
                    operacaoId: operacaoId
                }));
            }
        );
    }

}
