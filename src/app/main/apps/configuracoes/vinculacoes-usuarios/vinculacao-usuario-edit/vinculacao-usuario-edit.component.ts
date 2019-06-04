import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {VinculacaoUsuario} from '@cdk/models/vinculacao-usuario.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Usuario} from '@cdk/models/usuario.model';
import {Pagination} from '@cdk/models/pagination';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'vinculacao-usuario-edit',
    templateUrl: './vinculacao-usuario-edit.component.html',
    styleUrls: ['./vinculacao-usuario-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class VinculacaoUsuarioEditComponent implements OnInit, OnDestroy {

    vinculacaoUsuario$: Observable<VinculacaoUsuario>;
    vinculacaoUsuario: VinculacaoUsuario;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    usuarioVinculadoPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.VinculacaoUsuarioEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoUsuario$ = this._store.pipe(select(fromStore.getVinculacaoUsuario));
        this.usuario = this._loginService.getUserProfile().usuario;

        this.usuarioVinculadoPagination = new Pagination();
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

}