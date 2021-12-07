import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Back} from 'app/store/actions';
import {CdkUtils} from '../../../../../../@cdk/utils';

import {MatStepper} from '@angular/material/stepper';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'usuario-edit',
    templateUrl: './usuario-edit.component.html',
    styleUrls: ['./usuario-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuarioEditComponent implements OnInit, OnDestroy {

    @ViewChild('stepper') stepper: MatStepper;

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

    private _unsubscribeAll: Subject<any> = new Subject();

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
        this._store.pipe(
            select(fromStore.getNextColaborador),
            filter(nextColaborador => !!nextColaborador),
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            this.stepper.next();
            this._store.dispatch(new fromStore.NextStepColaboradorSuccess({}));
        });

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.cargoPagination = new Pagination();
        this.cargoPagination.populate = ['populateAll'];
        this.modalidadeColaboradorPagination = new Pagination();
        this.modalidadeColaboradorPagination.populate = ['populateAll'];

        this.formUsuario = this._formBuilder.group({
            id: [null],
            username: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            email: [null, [Validators.required, Validators.email, Validators.maxLength(255)]],
            nivelAcesso: [0, [Validators.required, Validators.maxLength(2)]],
            enabled: [true, [Validators.required]]
        });

        this.formColaborador = this._formBuilder.group({
            id: [null],
            modalidadeColaborador: [null, [Validators.required]],
            usuario: [null],
            cargo: [null, [Validators.required]],
            ativo: [true, [Validators.required]]
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
            takeUntil(this._unsubscribeAll)
        ).subscribe((usuario) => {
            this.usuario = usuario;
            if (usuario && usuario.colaborador) {
                this.colaborador = usuario.colaborador;
            }
        });

        if (!this.usuario) {
            this.usuario = new Usuario();
            this.usuario.enabled = true;
            this.usuario.nivelAcesso = 0;
        }
        if (!this.colaborador) {
            this.colaborador = new Colaborador();
            this.colaborador.ativo = true;
        }
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

    submitUsuario(values): void {
        const usuario = new Usuario();
        Object.entries(values).forEach(
            ([key, value]) => {
                usuario[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveUsuario({
            usuario: usuario,
            operacaoId: operacaoId
        }));
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveColaborador({
            colaborador: colaborador,
            operacaoId: operacaoId
        }));
    }

    doAbortColaborador(): void {
        this._store.dispatch(new Back());
    }
}
