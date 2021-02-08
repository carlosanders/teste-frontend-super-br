import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {VinculacaoRepositorio, Pagination} from '@cdk/models';

@Component({
    selector: 'repositorios-especie-setor-list',
    templateUrl: './repositorios-especie-setor-list.component.html',
    styleUrls: ['./repositorios-especie-setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEspecieSetorListComponent implements OnInit {

    vinculacoesRepositorios$: Observable<VinculacaoRepositorio[]>;
    routerState: any;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    modalidadeOrgaoCentralPagination: Pagination = new Pagination();
    repositorioPagination: Pagination = new Pagination();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RepositoriosEspecieSetorListAppState>,
    ) {
        this.vinculacoesRepositorios$ = this._store.pipe(select(fromStore.getRepositoriosEspecieSetorList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.modalidadeOrgaoCentralPagination.filter = {
            id: 'eq:' + this.routerState.params['entidadeHandle']
        };
        this.modalidadeOrgaoCentralPagination.populate = ['populateAll'];
        this.repositorioPagination.filter = {
            id: 'eq:' + this.routerState.params['repositorioHandle']
        };
        this.repositorioPagination.populate = ['populateAll'];
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositoriosEspecieSetor({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(vinculacaoRepositorioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoRepositorioId]);
    }

    delete(vinculacaoRepositorioId: number): void {
        this._store.dispatch(new fromStore.DeleteRepositorioEspecieSetor(vinculacaoRepositorioId));
    }

}

