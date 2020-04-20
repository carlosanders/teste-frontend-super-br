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
import {VinculacaoModelo, Pagination} from '@cdk/models';

@Component({
    selector: 'modelos-especie-setor-list',
    templateUrl: './modelos-especie-setor-list.component.html',
    styleUrls: ['./modelos-especie-setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEspecieSetorListComponent implements OnInit {

    vinculacoesModelos$: Observable<VinculacaoModelo[]>;
    routerState: any;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    orgaoCentralPagination: Pagination = new Pagination();
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
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.orgaoCentralPagination.filter = {
            'id': 'eq:' + this.routerState.params['entidadeHandle']
        };
        this.orgaoCentralPagination.populate = ['populateAll'];
        this.modeloPagination.filter = {
            'id': 'eq:' + this.routerState.params['modeloHandle']
        };
        this.modeloPagination.populate = ['populateAll'];
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetModelosEspecieSetor({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    edit(vinculacaoModeloId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + vinculacaoModeloId]);
    }

    delete(vinculacaoModeloId: number): void {
        this._store.dispatch(new fromStore.DeleteModeloEspecieSetor(vinculacaoModeloId));
    }

}
