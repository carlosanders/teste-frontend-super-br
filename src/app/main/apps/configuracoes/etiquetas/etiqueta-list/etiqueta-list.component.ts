import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Etiqueta} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'etiqueta-list',
    templateUrl: './etiqueta-list.component.html',
    styleUrls: ['./etiqueta-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EtiquetaListComponent implements OnInit {

    routerState: any;
    etiquetas$: Observable<Etiqueta[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EtiquetaListAppState>,
    ) {
        this.etiquetas$ = this._store.pipe(select(fromStore.getEtiquetaList));
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
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEtiquetas({
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

    excluded(params): void {
        this._store.dispatch(new fromStore.GetEtiquetas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(etiquetaId: number): void {
        this._router.navigate(['apps/configuracoes/etiquetas/editar/' + etiquetaId + '/dados-basicos']);
    }

    acoes(etiquetaId: number): void {
        this._router.navigate(['apps/configuracoes/etiquetas/editar/' + etiquetaId + '/acoes']);
    }

    regras(etiquetaId: number): void {
        this._router.navigate(['apps/configuracoes/etiquetas/editar/' + etiquetaId + '/regras']);
    }

    delete(etiquetaId: number): void {
        this._store.dispatch(new fromStore.DeleteEtiqueta(etiquetaId));
    }

}
