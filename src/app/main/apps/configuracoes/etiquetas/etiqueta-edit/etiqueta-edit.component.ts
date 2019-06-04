import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Etiqueta} from '@cdk/models/etiqueta.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'etiqueta-edit',
    templateUrl: './etiqueta-edit.component.html',
    styleUrls: ['./etiqueta-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EtiquetaEditComponent implements OnInit, OnDestroy {

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    usuario: Usuario;

    modalidadeEtiquetaPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.EtiquetaEditAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.etiqueta$ = this._store.pipe(select(fromStore.getEtiqueta));
        this.usuario = this._loginService.getUserProfile().usuario;

        this.modalidadeEtiquetaPagination = new Pagination();
        this.modalidadeEtiquetaPagination.populate = ['parent'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.etiqueta$.subscribe(
            etiqueta => this.etiqueta = etiqueta
        );

        if (!this.etiqueta) {
            this.etiqueta = new Etiqueta();
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

        const etiqueta = new Etiqueta();

        Object.entries(values).forEach(
            ([key, value]) => {
                etiqueta[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveEtiqueta(etiqueta));

    }

}
