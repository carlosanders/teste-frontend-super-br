import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";

@Component({
    selector: 'vinculacao-pessoa-barramento-list',
    templateUrl: './vinculacao-pessoa-barramento-list.component.html',
    styleUrls: ['./vinculacao-pessoa-barramento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoPessoaBarramentoListComponent implements OnInit {

    routerState: any;
    vinculacaoPessoaBarramentos$: Observable<VinculacaoPessoaBarramento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.VinculacaoPessoaBarramentoListAppState>,
    ) {
        this.vinculacaoPessoaBarramentos$ = this._store.pipe(select(fromStore.getVinculacaoPessoaBarramentoList));
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
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetVinculacaoPessoaBarramentos({
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
            populate: this.pagination.populate
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('vinculacao-pessoa-barramento/listar', 'vinculacao-pessoa-barramento/editar/criar')]);
    }

    edit(vinculacaoPessoaBarramentoId: number): void {
        this._router.navigate([this.routerState.url.replace('vinculacao-pessoa-barramento/listar', 'vinculacao-pessoa-barramento/editar/') + vinculacaoPessoaBarramentoId]);
    }

    delete(vinculacaoPessoaBarramentoId: number): void {
        this._store.dispatch(new fromStore.DeleteVinculacaoPessoaBarramento(vinculacaoPessoaBarramentoId));
    }

}
