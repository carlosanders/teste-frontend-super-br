import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Repositorio} from '@cdk/models/repositorio.model';
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
    selector: 'coordenador-repositorios-edit',
    templateUrl: './repositorios-edit.component.html',
    styleUrls: ['./repositorios-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    repositorio$: Observable<Repositorio>;
    repositorio: Repositorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    setor$: Observable<Setor>;
    setorHandle$: Observable<Setor>;
    setor: Setor = null;
    modalidadeOrgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    modalidadeOrgaoCentral: ModalidadeOrgaoCentral = null;
    unidade$: Observable<Setor>;
    unidadeHandle$: Observable<Setor>;
    unidade: Setor = null;
    usuario: Usuario;
    setorPagination: Pagination;
    modalidadeRepositorioPagination: Pagination;

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RepositorioEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.repositorio$ = this._store.pipe(select(fromStore.getRepositorio));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.unidade$ = this._store.pipe(select(fromStore.getUnidade));
        this.modalidadeOrgaoCentral$ = this._store.pipe(select(fromStore.getModalidadeOrgaoCentral));

        this._store
            .pipe(select(getRouterState))
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

        this.modalidadeRepositorioPagination = new Pagination();
        this.modalidadeRepositorioPagination.populate = ['populateAll'];
        this.modalidadeRepositorioPagination.filter = {
            ativo: 'eq:' + true
        };

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.repositorio$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            repositorio => {
                if (repositorio) {
                    this.repositorio = repositorio;
                    if (this.repositorio.vinculacoesRepositorios[0]?.setor) {
                        this.repositorio.setor = this.repositorio.vinculacoesRepositorios[0]?.setor;
                    }
                    if (this.repositorio.vinculacoesRepositorios[0]?.unidade) {
                        this.repositorio.unidade = this.repositorio.vinculacoesRepositorios[0]?.unidade;
                    }
                    if (this.repositorio.vinculacoesRepositorios[0]?.usuario) {
                        this.repositorio.usuario = this.repositorio.vinculacoesRepositorios[0]?.usuario;
                    }
                    if (this.repositorio.vinculacoesRepositorios[0]?.modalidadeOrgaoCentral) {
                        this.repositorio.modalidadeOrgaoCentral = this.repositorio.vinculacoesRepositorios[0]?.modalidadeOrgaoCentral;
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

        this.modalidadeOrgaoCentral$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            modalidadeOrgaoCentral => {
                if (modalidadeOrgaoCentral) {
                    this.modalidadeOrgaoCentral = modalidadeOrgaoCentral;
                }
            }
        );

        if (!this.repositorio) {
            this.repositorio = new Repositorio();
            this.repositorio.ativo = true;
            if (this.setor) {
                this.repositorio.setor = this.setor;
            } else if (this.unidade) {
                this.repositorio.unidade = this.unidade;
            } else {
                this.repositorio.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
            }
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const repositorio = new Repositorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                repositorio[key] = value;
            }
        );

        if (this.setor) {
            repositorio.setor = this.setor;
        } else if (this.unidade) {
            repositorio.unidade = this.unidade;
        } else {
            repositorio.modalidadeOrgaoCentral = this.modalidadeOrgaoCentral;
        }

        this._store.dispatch(new fromStore.SaveRepositorio(repositorio));

    }

}
