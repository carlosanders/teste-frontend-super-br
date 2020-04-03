import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Repositorio} from '@cdk/models/repositorio.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Lotacao, Setor} from "../../../../../../@cdk/models";

@Component({
    selector: 'coordenador-repositorios-edit',
    templateUrl: './repositorios-edit.component.html',
    styleUrls: ['./repositorios-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEditComponent implements OnInit, OnDestroy {

    routerState: any;
    repositorio$: Observable<Repositorio>;
    repositorio: Repositorio;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    coordenador: boolean;
    usuario: Usuario;
    setorPagination: Pagination;
    modalidadeRepositorioPagination: Pagination;

    setores: Setor[] = [];

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
        // this.usuario = this._loginService.getUserProfile();
        this.coordenador = true;

        this._loginService.getUserProfile().colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                this.setores.push(lotacao.setor);
            }
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'id': 'in:' + this.setores.map(setor => setor.id).join(',')
        }

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

        this.repositorio$.subscribe(
            repositorio => {
                if (repositorio) {
                    this.repositorio = repositorio;
                    if (this.repositorio.vinculacoesRepositorios[0]?.setor) {
                        this.repositorio.setor = this.repositorio.vinculacoesRepositorios[0]?.setor;
                    }
                    if (this.repositorio.vinculacoesRepositorios[0]?.usuario) {
                        this.repositorio.usuario = this.repositorio.vinculacoesRepositorios[0]?.usuario;
                    }
                }
            }
        );

        if (!this.repositorio) {
            this.repositorio = new Repositorio();
            this.repositorio.ativo = true;
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

    submit(values): void {

        const repositorio = new Repositorio();
        Object.entries(values).forEach(
            ([key, value]) => {
                repositorio[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveRepositorio(repositorio));

    }

}
