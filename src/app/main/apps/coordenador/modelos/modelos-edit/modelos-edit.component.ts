import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Modelo} from '@cdk/models/modelo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Lotacao, ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'coordenador-modelos-edit',
    templateUrl: './modelos-edit.component.html',
    styleUrls: ['./modelos-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
    setor$: Observable<Setor>;
    setor: Setor = null;
    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral = null;
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
        private _store: Store<fromStore.ModeloEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
        this.usuario = this._loginService.getUserProfile();
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.templatePagination = new Pagination();
        this.templatePagination.populate = ['documento', 'documento.tipoDocumento'];

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.modelo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            modelo => {
                if (modelo) {
                    this.modelo = modelo;
                    if (this.modelo.vinculacoesModelos[0]?.setor) {
                        this.modelo.setor = this.modelo.vinculacoesModelos[0]?.setor;
                    }
                    if (this.modelo.vinculacoesModelos[0]?.usuario) {
                        this.modelo.usuario = this.modelo.vinculacoesModelos[0]?.usuario;
                    }
                    if (this.modelo.vinculacoesModelos[0]?.orgaoCentral) {
                        this.modelo.orgaoCentral = this.modelo.vinculacoesModelos[0]?.orgaoCentral;
                    }
                }
            }
        );

        this.setor$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            setor => {
                if (setor) {
                    this.setor = setor;
                }
            }
        );

        this.orgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            orgaoCentral => {
                if (orgaoCentral) {
                    this.orgaoCentral = orgaoCentral;
                }
            }
        );

        if (!this.modelo) {
            this.modelo = new Modelo();
            this.modelo.ativo = true;
            if (this.orgaoCentral) {
                this.modelo.orgaoCentral = this.orgaoCentral;
            } else {
                this.modelo.setor = this.setor;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const modelo = new Modelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        if (this.orgaoCentral) {
           modelo.orgaoCentral = this.orgaoCentral;
        } else {
           modelo.setor = this.setor;
        }

        this._store.dispatch(new fromStore.SaveModelo(modelo));

    }

}
