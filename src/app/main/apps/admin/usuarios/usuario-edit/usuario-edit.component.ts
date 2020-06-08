import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario, Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Back} from 'app/store/actions';

@Component({
    selector: 'usuario-edit',
    templateUrl: './usuario-edit.component.html',
    styleUrls: ['./usuario-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuarioEditComponent implements OnInit, OnDestroy {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    colaborador: Colaborador;
    cargoPagination: Pagination;
    modalidadeColaboradorPagination: Pagination;
    formUsuario: FormGroup;
    formColaborador: FormGroup;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.UsuarioEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.cargoPagination = new Pagination();
        this.cargoPagination.populate = ['populateAll'];
        this.modalidadeColaboradorPagination = new Pagination();
        this.modalidadeColaboradorPagination.populate = ['populateAll'];

        this.formUsuario = this._formBuilder.group({
            id: [null],
            username: [null, [Validators.required, Validators.maxLength(255)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            nivelAcesso: [0, [Validators.required, Validators.maxLength(2)]],
            enabled: [null]
        });

        this.formColaborador = this._formBuilder.group({
            id: [null],
            modalidadeColaborador: [null, [Validators.required]],
            usuario: [null],
            cargo: [null, [Validators.required]],
            ativo: [null]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.usuario$.subscribe(
            usuario => {
                this.usuario = usuario;
                if (usuario && usuario.colaborador) {
                    this.colaborador = usuario.colaborador;
                }
            }
        );

        if (!this.usuario) {
            this.usuario = new Usuario();
        }
        if (!this.colaborador) {
            this.colaborador = new Colaborador();
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

    submitUsuario(values): void {
        const usuario = new Usuario();
        Object.entries(values).forEach(
            ([key, value]) => {
                usuario[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveUsuario(usuario));
    }

    doAbortUsuario(): void {
        this._store.dispatch(new Back());
    }

    submitColaborador(values): void {
        const colaborador = new Colaborador();
        Object.entries(values).forEach(
            ([key, value]) => {
                colaborador[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveColaborador(colaborador));
    }

    doAbortColaborador(): void {
        //this.stepper.previous();
        this._store.dispatch(new Back());
    }
}
