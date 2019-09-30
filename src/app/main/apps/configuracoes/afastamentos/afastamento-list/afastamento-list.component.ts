import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Afastamento} from '@cdk/models/afastamento.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'afastamento-list',
    templateUrl: './afastamento-list.component.html',
    styleUrls: ['./afastamento-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AfastamentoListComponent implements OnInit {

    routerState: any;
    afastamentos$: Observable<Afastamento[]>;
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
        private _store: Store<fromStore.AfastamentoListAppState>,
    ) {
        this.afastamentos$ = this._store.pipe(select(fromStore.getAfastamentoList));
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
        this._store.dispatch(new fromStore.GetAfastamentos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    edit(afastamentoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + afastamentoId]);
    }

    editConteudo(documentoId: number): void {
        this._router.navigate([this.routerState.url + '/documento/' + documentoId + '/afastamento']).then();
    }

    delete(afastamentoId: number): void {
        this._store.dispatch(new fromStore.DeleteAfastamento(afastamentoId));
    }

}