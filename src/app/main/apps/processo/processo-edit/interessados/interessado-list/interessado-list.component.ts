import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Interessado} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/processo/processo-edit/interessados/interessado-list/store';
import {getRouterState} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'interessado-list',
    templateUrl: './interessado-list.component.html',
    styleUrls: ['./interessado-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class InteressadoListComponent implements OnInit {

    routerState: any;
    interessados$: Observable<Interessado[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.InteressadoListAppState>,
    ) {
        this.interessados$ = this._store.pipe(select(fromStore.getInteressadoList));
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
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetInteressados({
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

    excluded(params): void {
        this._store.dispatch(new fromStore.GetInteressados({
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
            context: params.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(interessadoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + interessadoId]);
    }

    delete(interessadoId: any, loteId: string = null): void {
        if(interessadoId.length > 0){
            this.lote = CdkUtils.makeId();
            interessadoId.forEach((i) => {
                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new fromStore.DeleteInteressado({
                    interessadoId: i,
                    operacaoId: operacaoId,
                    loteId: this.lote,
                }));
            });
        } else{
            const operacaoId = CdkUtils.makeId();
            this._store.dispatch(new fromStore.DeleteInteressado({
                interessadoId: interessadoId,
                operacaoId: operacaoId,
                loteId: null,
            }));
        }

    }

}
