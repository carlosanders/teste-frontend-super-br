import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Usuario, VinculacaoRole, Visibilidade} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from '../../../../../../store';
import {CdkUtils} from '@cdk/utils';
import {StaticRoleService} from '@cdk/services/static-role.service';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'visibilidade-edit',
    templateUrl: './visibilidade-edit.component.html',
    styleUrls: ['./visibilidade-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VisibilidadeEditComponent implements OnInit, OnDestroy {

    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    routerState: any;
    staticRoles: any;

    _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _loginService
     * @param _staticRoles
     */
    constructor(
        private _store: Store<fromStore.VisibilidadeEditAppState>,
        public _loginService: LoginService,
        private _staticRoles: StaticRoleService
    ) {
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._staticRoles.getStaticRolesTipoRelatorio().subscribe(
            staticRoles => this.staticRoles = staticRoles
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        Object.entries(values).forEach(
            ([key, value]) => {
                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.SaveVisibilidade({
                    tipoRelatorioId: this.routerState.params['tipoRelatorioHandle'],
                    visibilidade: value,
                    operacaoId: operacaoId
                }));
            }
        );
    }

    abort(): void {
        this._store.dispatch(new Back());
    }

}
