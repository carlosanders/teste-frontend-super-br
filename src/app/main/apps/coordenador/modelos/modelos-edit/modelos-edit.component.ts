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
import {getRouterState} from 'app/store/reducers';
import {ModalidadeOrgaoCentral, Setor} from '@cdk/models';
import {takeUntil} from 'rxjs/operators';
import {Back} from 'app/store/actions';

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
    setorHandle$: Observable<Setor>;
    setor: Setor = null;
    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral = null;
    unidade$: Observable<Setor>;
    unidadeHandle$: Observable<Setor>;
    unidade: Setor = null;
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
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if (this.routerState.params['unidadeHandle']) {
                        this.unidadeHandle$ = this._store.pipe(select(fromStore.getUnidadeHandle));

                        this.unidadeHandle$.pipe(
                            takeUntil(this._unsubscribeAll)
                        ).subscribe(
                            setor => {
                                if (setor) {
                                    this.unidade = setor;
                                }
                            }
                        );
                    }
                    if (this.routerState.params['setorHandle']) {
                        this.setorHandle$ = this._store.pipe(select(fromStore.getSetorHandle));

                        this.setorHandle$.pipe(
                            takeUntil(this._unsubscribeAll)
                        ).subscribe(
                            setor => {
                                if (setor) {
                                    this.setor = setor;
                                }
                            }
                        );
                    }
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
                    if (this.modelo.vinculacoesModelos[0]?.unidade) {
                        this.modelo.unidade = this.modelo.vinculacoesModelos[0]?.unidade;
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

        this.unidade$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            setor => {
                if (setor) {
                    this.unidade = setor;
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
            if (this.setor) {
                this.modelo.setor = this.setor;
            } else if (this.unidade) {
                this.modelo.unidade = this.unidade;
            } else {
                this.modelo.orgaoCentral = this.orgaoCentral;
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const modelo = new Modelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        if (this.modelo.modalidadeModelo) {
            modelo.modalidadeModelo = this.modelo.modalidadeModelo;
        }

        if (this.setor) {
            modelo.setor = this.setor;
        } else if (this.unidade) {
            modelo.unidade = this.unidade;
        } else {
            modelo.orgaoCentral = this.orgaoCentral;
        }

        this._store.dispatch(new fromStore.SaveModelo(modelo));

    }

}
