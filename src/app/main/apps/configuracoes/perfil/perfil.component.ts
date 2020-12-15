import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {LoginService} from '../../../auth/login/login.service';
import {Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';

@Component({
    selector: 'perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PerfilComponent implements OnInit, OnDestroy {
    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;

    /**
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ProfileAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.usuario = this._loginService.getUserProfile();
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
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
        usuario.id = this.usuario.id;
        this._store.dispatch(new fromStore.SaveProfile({usuario: usuario, changes: values}));
    }

}
