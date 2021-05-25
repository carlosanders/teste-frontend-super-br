import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {VinculacaoUsuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Usuario} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back} from '../../../../../store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';

@Component({
    selector: 'vinculacao-usuario-edit',
    templateUrl: './vinculacao-usuario-edit.component.html',
    styleUrls: ['./vinculacao-usuario-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoUsuarioEditComponent implements OnInit, OnDestroy {
    routerState: any;
    vinculacaoUsuario$: Observable<VinculacaoUsuario>;
    vinculacaoUsuario: VinculacaoUsuario;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    usuarioVinculadoPagination: Pagination;
    logEntryPagination: Pagination;

    /**
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.VinculacaoUsuarioEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoUsuario$ = this._store.pipe(select(fromStore.getVinculacaoUsuario));
        this.usuario = this._loginService.getUserProfile();

        this.usuarioVinculadoPagination = new Pagination();
        this.usuarioVinculadoPagination.filter = {'colaborador.id': 'isNotNull'};
        this.logEntryPagination = new Pagination();

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.vinculacaoUsuario$.subscribe(
            vinculacaoUsuario => this.vinculacaoUsuario = vinculacaoUsuario
        );

        if (!this.vinculacaoUsuario) {
            this.vinculacaoUsuario = new VinculacaoUsuario();
            this.vinculacaoUsuario.usuario = this.usuario;
        }

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\VinculacaoUsuario', id: + this.vinculacaoUsuario.id};
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const vinculacaoUsuario = new VinculacaoUsuario();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoUsuario[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveVinculacaoUsuario(vinculacaoUsuario));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
