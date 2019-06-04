import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'seguranca',
    templateUrl: './seguranca.component.html',
    styleUrls: ['./seguranca.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class SegurancaComponent implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.SegurancaAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.usuario = this._loginService.getUserProfile().usuario;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

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

        const usuario = new Usuario();

        Object.entries(values).forEach(
            ([key, value]) => {
                usuario[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveSeguranca(usuario));

    }

}