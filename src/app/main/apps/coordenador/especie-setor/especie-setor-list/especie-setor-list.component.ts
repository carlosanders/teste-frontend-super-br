import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {EspecieSetor, Pagination} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';

@Component({
    selector: 'especie-setor-list',
    templateUrl: './especie-setor-list.component.html',
    styleUrls: ['./especie-setor-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspecieSetorListComponent implements OnInit {

    routerState: any;
    especieSetor$: Observable<EspecieSetor[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    colaboradorPagination: Pagination = new Pagination();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.EspecieSetorListAppState>,
    ) {
        this.especieSetor$ = this._store.pipe(select(fromStore.getEspecieSetorList));
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

        this.colaboradorPagination.filter = {};
        this.colaboradorPagination.populate = ['populateAll'];
        if (this.routerState.params['modeloHandle']) {
            this.colaboradorPagination.filter = {
                ...this.colaboradorPagination.filter,
                'modelo.id': 'eq:' + this.routerState.params['modeloHandle']
            };
        }
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetEspecieSetor({
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

    edit(especieSetorId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'vincular/') + especieSetorId]);
    }

    delete(especieSetorId: number): void {
        this._store.dispatch(new fromStore.DeleteEspecieSetor(especieSetorId));
    }

}
