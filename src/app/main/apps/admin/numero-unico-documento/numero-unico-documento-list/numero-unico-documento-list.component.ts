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
import {NumeroUnicoDocumento, Pagination} from "@cdk/models";

@Component({
    selector: 'numero-unico-documento-list',
    templateUrl: './numero-unico-documento-list.component.html',
    styleUrls: ['./numero-unico-documento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NumeroUnicoDocumentoListComponent implements OnInit {

    routerState: any;
    numerosUnicosDocumentos$: Observable<NumeroUnicoDocumento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    setorPagination: Pagination = new Pagination();
    tipoDocumentoPagination: Pagination = new Pagination();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.NumeroUnicoDocumentoListAppState>,
    ) {
        this.numerosUnicosDocumentos$ = this._store.pipe(select(fromStore.getNumeroUnicoDocumentoList));
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
        this.tipoDocumentoPagination.populate = ['populateAll'];
        this.setorPagination.filter = {'unidade.id':'eq:' + this.routerState.params.unidadeHandle};
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetNumerosUnicosDocumentos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: {
                isAdmin: true
            }
        }));
    }

    edit(numeroUnicoDocumentoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + numeroUnicoDocumentoId]);
    }

    delete(numeroUnicoDocumentoId: number): void {
        this._store.dispatch(new fromStore.DeleteNumeroUnicoDocumento(numeroUnicoDocumentoId));
    }

}
