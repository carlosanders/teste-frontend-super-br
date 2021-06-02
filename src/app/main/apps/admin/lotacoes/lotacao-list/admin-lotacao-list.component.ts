import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Lotacao} from '@cdk/models/lotacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'admin-lotacao-list',
    templateUrl: './admin-lotacao-list.component.html',
    styleUrls: ['./admin-lotacao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminLotacaoListComponent implements OnInit {

    routerState: any;
    lotacoes$: Observable<Lotacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    setorPagination: Pagination = new Pagination();
    colaboradorPagination: Pagination = new Pagination();
    modulo: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RootLotacaoListAppState>,
    ) {
        this.lotacoes$ = this._store.pipe(select(fromStore.getLotacaoList));
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
                    if (this.routerState.url.includes('unidade')) {
                        this.modulo = 'unidade';
                    } else if (this.routerState.url.includes('usuario')) {
                        this.modulo = 'usuario';
                    } else {
                        this.modulo = 'lotacao';
                    }
                }
            });

        this.setorPagination.populate = ['populateAll'];
        this.colaboradorPagination.filter = {};
        this.colaboradorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'parent.id': 'isNotNull'
        };
        if (this.routerState.params['unidadeHandle']) {
            this.setorPagination.filter = {
                ...this.setorPagination.filter,
                'unidade.id': 'eq:' + this.routerState.params.unidadeHandle
            };
        }
        if (this.routerState.params['usuarioHandle']) {
            this.colaboradorPagination.filter = {
                ...this.colaboradorPagination.filter,
                'usuario.id': 'eq:' + this.routerState.params['usuarioHandle']
            };
        }
        if (this.routerState.params['setorHandle']) {
            this.setorPagination.filter = {
                ...this.setorPagination.filter,
                id: 'eq:' + this.routerState.params['setorHandle']
            };
        }
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetLotacoes({
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

    edit(lotacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + lotacaoId]);
    }

    delete(lotacaoId: number): void {
        this._store.dispatch(new fromStore.DeleteLotacao(lotacaoId));
    }

}
