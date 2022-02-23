import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation, OnChanges
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Historico} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'historico-list',
    templateUrl: './historico-list.component.html',
    styleUrls: ['./historico-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class HistoricoConfigListComponent implements OnInit, OnChanges, OnDestroy {

    routerState: any;
    historicosConfig$: Observable<Historico[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _route
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.HistoricoConfigListAppState>,
        private _route: ActivatedRoute
    ) {
        this.historicosConfig$ = this._store.pipe(select(fromStore.getHistoricoConfigList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnChanges(): void {
        console.log(this.historicosConfig$);
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadHistoricoConfig());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetHistoricoConfig({
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
            populate: [
                ...this.pagination.populate
            ],
            context: params.context,
        }));
    }
    }