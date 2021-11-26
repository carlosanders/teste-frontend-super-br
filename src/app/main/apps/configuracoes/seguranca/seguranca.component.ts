import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Usuario} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {Back} from 'app/store/actions';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store';
import {filter} from 'rxjs/operators';
import {CdkUtils} from '../../../../../@cdk/utils';

@Component({
    selector: 'seguranca',
    templateUrl: './seguranca.component.html',
    styleUrls: ['./seguranca.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SegurancaComponent implements OnInit, OnDestroy {
    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.SegurancaAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.usuario = this._loginService.getUserProfile();
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

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {
        const usuario = new Usuario();
        usuario.id = this.usuario.id;
        const changes = {
            plainPassword: values.plainPassword,
            currentPlainPassword: values.senhaAtual
        };
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveSeguranca({usuario: usuario, changes: changes, operacaoId: operacaoId}));
    }
}
