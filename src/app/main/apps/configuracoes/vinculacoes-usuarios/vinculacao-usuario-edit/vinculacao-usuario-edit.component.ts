import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Usuario, VinculacaoUsuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {Router} from '@angular/router';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

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
    private _unsubscribeAll: Subject<any> = new Subject();

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

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.vinculacaoUsuario$.pipe(
            filter(vinculacaoUsuario => !!vinculacaoUsuario),
            takeUntil(this._unsubscribeAll)
        ).subscribe(vinculacaoUsuario => this.vinculacaoUsuario = vinculacaoUsuario);

        if (!this.vinculacaoUsuario) {
            this.vinculacaoUsuario = new VinculacaoUsuario();
            this.vinculacaoUsuario.usuario = this.usuario;
        }

        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\VinculacaoUsuario',
            id: +this.vinculacaoUsuario.id
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVinculacaoUsuario({
            vinculacaoUsuario: vinculacaoUsuario,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
