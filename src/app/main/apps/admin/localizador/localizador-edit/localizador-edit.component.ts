import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Localizador} from '@cdk/models/localizador.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'localizador-edit',
    templateUrl: './localizador-edit.component.html',
    styleUrls: ['./localizador-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LocalizadorEditComponent implements OnInit, OnDestroy {

    localizador$: Observable<Localizador>;
    localizador: Localizador;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    templatePagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.LocalizadorEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.localizador$ = this._store.pipe(select(fromStore.getLocalizador));
        this.usuario = this._loginService.getUserProfile();

        this.templatePagination = new Pagination();
        this.templatePagination.populate = ['documento', 'documento.tipoDocumento'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.localizador$.subscribe(
            localizador => this.localizador = localizador
        );

        if (!this.localizador) {
            this.localizador = new Localizador();
            this.localizador.ativo = true;
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

        const localizador = new Localizador();

        Object.entries(values).forEach(
            ([key, value]) => {
                localizador[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveLocalizador(localizador));

    }

}
