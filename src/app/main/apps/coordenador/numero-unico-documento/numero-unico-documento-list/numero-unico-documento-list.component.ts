import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {NumeroUnicoDocumento, Pagination} from '@cdk/models';

import {UnloadNumerosUnicosDocumentos} from "./store";


@Component({
    selector: 'numero-unico-documento-list',
    templateUrl: './numero-unico-documento-list.component.html',
    styleUrls: ['./numero-unico-documento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NumeroUnicoDocumentoListComponent implements OnInit, OnDestroy {

    routerState: any;
    numerosUnicosDocumentos$: Observable<NumeroUnicoDocumento[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
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
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
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
        this.setorPagination.filter = {
        };
        const setorId = (this.routerState.params['generoHandle'] === 'unidade' ?
            this.routerState.params['entidadeHandle'] : (this.routerState.params['setorHandle'] ?
                        this.routerState.params['setorHandle'] : this.routerState.params['unidadeHandle']));
        this.setorPagination.filter = {
            ...this.setorPagination.filter,
            id: 'eq:' + setorId,
        };
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadNumerosUnicosDocumentos());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetNumerosUnicosDocumentos({
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
            context: {
                isAdmin: true
            }
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(numeroUnicoDocumentoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + numeroUnicoDocumentoId]);
    }

    delete(numeroUnicoDocumentoId: number): void {
        this._store.dispatch(new fromStore.DeleteNumeroUnicoDocumento(numeroUnicoDocumentoId));
    }

}
