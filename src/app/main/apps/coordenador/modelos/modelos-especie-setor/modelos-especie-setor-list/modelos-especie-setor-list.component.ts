import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnInit,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {VinculacaoModelo, Pagination} from '@cdk/models';

import {UnloadModelosEspecieSetor} from './store';


@Component({
    selector: 'modelos-especie-setor-list',
    templateUrl: './modelos-especie-setor-list.component.html',
    styleUrls: ['./modelos-especie-setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEspecieSetorListComponent implements OnInit, OnDestroy {

    vinculacoesModelos$: Observable<VinculacaoModelo[]>;
    routerState: any;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    modalidadeOrgaoCentralPagination: Pagination = new Pagination();
    modeloPagination: Pagination = new Pagination();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ModelosEspecieSetorListAppState>,
    ) {
        this.vinculacoesModelos$ = this._store.pipe(select(fromStore.getModelosEspecieSetorList));
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
        this.modeloPagination.filter = {
            id: 'eq:' + this.routerState.params['modeloHandle']
        };
        this.modeloPagination.populate = ['populateAll'];
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadModelosEspecieSetor());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelosEspecieSetor({
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

    edit(vinculacaoModeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoModeloId]);
    }

    delete(vinculacaoModeloId: number): void {
        this._store.dispatch(new fromStore.DeleteModeloEspecieSetor(vinculacaoModeloId));
    }

}

