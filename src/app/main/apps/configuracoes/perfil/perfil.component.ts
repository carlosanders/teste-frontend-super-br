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
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from '../../../auth/login/login.service';
import {Usuario} from '@cdk/models/usuario.model';

@Component({
    selector: 'perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class PerfilComponent implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    colaborador: Colaborador;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ProfileAppState>,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.colaborador = this._loginService.getUserProfile();
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
        usuario.id = this.colaborador.usuario.id;
        this._store.dispatch(new fromStore.SaveProfile({usuario: usuario, changes: values}));
    }

}
