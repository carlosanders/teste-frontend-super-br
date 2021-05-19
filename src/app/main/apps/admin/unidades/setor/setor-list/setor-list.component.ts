import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Setor} from '@cdk/models/setor.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'admin-setor-list',
    templateUrl: './setor-list.component.html',
    styleUrls: ['./setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SetorListComponent implements OnInit {

    routerState: any;
    setores$: Observable<Setor[]>;
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
        private _store: Store<fromStore.SetorListAppState>,
    ) {
        this.setores$ = this._store.pipe(select(fromStore.getSetorList));
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
        this._store.dispatch(new fromStore.GetSetores({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                'unidade.id': 'eq:' + this.routerState.params['unidadeHandle']
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

    edit(setorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + setorId]);
    }

    lotacoes(setorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${setorId}/lotacoes`)]);
    }

    localizadores(setorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${setorId}/localizadores`)]);
    }

    delete(setorId: number): void {
        this._store.dispatch(new fromStore.DeleteSetor(setorId));
    }

    doTransferirProcessosProtocolo(setor: Setor): void {
        this._store.dispatch(new fromStore.TransferirProcessosProtocolo(setor));
    }
}
