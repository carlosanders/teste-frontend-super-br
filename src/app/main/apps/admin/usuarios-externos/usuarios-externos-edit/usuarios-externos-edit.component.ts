import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Back} from '../../../../../store';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'usuarios-externos-edit',
    templateUrl: './usuarios-externos-edit.component.html',
    styleUrls: ['./usuarios-externos-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuariosExternosEditComponent implements OnInit, OnDestroy {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    formUsuario: FormGroup;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.UsuariosExternosEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuariosExternos));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.formUsuario = this._formBuilder.group({
            id: [null],
            username: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            nivelAcesso: [0, [Validators.required, Validators.maxLength(2)]],
            enabled: [null],
            validado: [null],
            reset: [false]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.usuario$.pipe(
            filter(usuario => !!usuario),
            takeUntil(this._unsubscribeAll)
        ).subscribe(usuario => this.usuario = usuario);

        if (!this.usuario) {
            this.usuario = new Usuario();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submitUsuario(values): void {
        const usuario = new Usuario();
        Object.entries(values).forEach(
            ([key, value]) => {
                usuario[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveUsuarioExternos({
            usuario: usuario,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
