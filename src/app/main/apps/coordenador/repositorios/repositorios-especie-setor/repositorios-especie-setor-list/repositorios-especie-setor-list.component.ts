import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Pagination, VinculacaoRepositorio} from '@cdk/models';
import {CdkUtils} from '../../../../../../../@cdk/utils';


@Component({
    selector: 'repositorios-especie-setor-list',
    templateUrl: './repositorios-especie-setor-list.component.html',
    styleUrls: ['./repositorios-especie-setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEspecieSetorListComponent implements OnInit, OnDestroy {

    vinculacoesRepositorios$: Observable<VinculacaoRepositorio[]>;
    routerState: any;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    modalidadeOrgaoCentralPagination: Pagination = new Pagination();
    repositorioPagination: Pagination = new Pagination();
    lote: string;

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
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
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
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadRepositoriosEspecieSetor());
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

    delete(vinculacaoRepositorioId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteRepositorioEspecieSetor({
            vinculacaoRepositorioId: vinculacaoRepositorioId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]) {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

}

