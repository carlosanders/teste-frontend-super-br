import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Localizador} from '@cdk/models/localizador.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Pagination} from '@cdk/models';
import {CdkUtils} from '../../../../../../../../@cdk/utils';

@Component({
    selector: 'admin-localizadores-list',
    templateUrl: './localizadores-list.component.html',
    styleUrls: ['./localizadores-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class LocalizadoresListComponent implements OnInit {

    routerState: any;
    localizadors$: Observable<Localizador[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    setorPagination: Pagination = new Pagination();
    lote: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RootLocalizadoresListAppState>,
    ) {
        this.localizadors$ = this._store.pipe(select(fromStore.getLocalizadorList));
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

        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'unidade.id': 'eq:' + this.routerState.params.unidadeHandle,
            'id': 'eq:' + this.routerState.params.setorHandle
        };
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetLocalizadores({
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

    edit(localizadorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + localizadorId]);
    }

    delete(localizadorId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteLocalizador({
            localizadorId: localizadorId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]) {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }
}
