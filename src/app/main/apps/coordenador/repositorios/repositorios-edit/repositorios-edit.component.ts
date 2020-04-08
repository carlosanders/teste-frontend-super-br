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
import {getRouterState} from '../../../../../store/reducers';
import {Lotacao, ModalidadeOrgaoCentral, Setor} from "../../../../../../@cdk/models";
import {takeUntil} from "rxjs/operators";

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
    setor: Setor = null;
    orgaoCentral$: Observable<ModalidadeOrgaoCentral>;
    orgaoCentral: ModalidadeOrgaoCentral = null;
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
        this.orgaoCentral$ = this._store.pipe(select(fromStore.getOrgaoCentral));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.modalidadeRepositorioPagination = new Pagination();
        this.modalidadeRepositorioPagination.populate = ['populateAll'];
        this.modalidadeRepositorioPagination.filter = {
            'ativo': 'eq:' + true
        }

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
                    if (this.repositorio.vinculacoesRepositorios[0]?.usuario) {
                        this.repositorio.usuario = this.repositorio.vinculacoesRepositorios[0]?.usuario;
                    }
                    if (this.repositorio.vinculacoesRepositorios[0]?.orgaoCentral) {
                        this.repositorio.orgaoCentral = this.repositorio.vinculacoesRepositorios[0]?.orgaoCentral;
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

        if (!this.repositorio) {
            this.repositorio = new Repositorio();
            this.repositorio.ativo = true;
            if (this.orgaoCentral) {
                this.repositorio.orgaoCentral = this.orgaoCentral;
            } else {
                this.repositorio.setor = this.setor;
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

    submit(values): void {

        const repositorio = new Repositorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                repositorio[key] = value;
            }
        );

        if (this.orgaoCentral) {
            repositorio.orgaoCentral = this.orgaoCentral;
        } else {
            repositorio.setor = this.setor;
        }

        this._store.dispatch(new fromStore.SaveRepositorio(repositorio));

    }

}
