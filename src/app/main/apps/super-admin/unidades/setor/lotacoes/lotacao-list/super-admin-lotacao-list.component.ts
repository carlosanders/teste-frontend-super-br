import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Lotacao} from '@cdk/models/lotacao.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Pagination} from '@cdk/models';

@Component({
    selector: 'root-lotacao-list',
    templateUrl: './super-admin-lotacao-list.component.html',
    styleUrls: ['./super-admin-lotacao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SuperAdminLotacaoListComponent implements OnInit {

    routerState: any;
    lotacoes$: Observable<Lotacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    setorPagination: Pagination = new Pagination();
    colaboradorPagination: Pagination = new Pagination();

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
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination.populate = ['populateAll'];
        this.colaboradorPagination.filter = {};
        this.colaboradorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'id':'eq:' + this.routerState.params['setorHandle']
        };
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    create() : void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetLotacoes({
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

    edit(lotacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + lotacaoId]);
    }

    delete(lotacaoId: number): void {
        this._store.dispatch(new fromStore.DeleteLotacao(lotacaoId));
    }

}
