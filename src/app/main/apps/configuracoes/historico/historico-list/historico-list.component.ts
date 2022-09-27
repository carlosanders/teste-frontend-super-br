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
import {LoginService} from '../../../../auth/login/login.service';
import {TableDefinitionsService} from "../../../../../../@cdk/components/table-definitions/table-definitions.service";
import {TableDefinitions} from "../../../../../../@cdk/components/table-definitions/table-definitions";
import {
    CdkHistoricoGridColumns
} from "../../../../../../@cdk/components/historico/cdk-historico-grid/cdk-historico-grid.columns";

@Component({
    selector: 'historico-list',
    templateUrl: './historico-list.component.html',
    styleUrls: ['./historico-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class HistoricoConfigListComponent implements OnInit, OnDestroy {

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['config', 'historico', 'HistoricoConfigListComponent', 'CdkHistoricoGrid'];

    routerState: any;
    historicosConfig$: Observable<Historico[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();
    tableDefinitions: TableDefinitions = new TableDefinitions();

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _route
     * @param _loginService
     * @param _tableDefinitionsService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.HistoricoConfigListAppState>,
        private _route: ActivatedRoute,
        private _loginService: LoginService,
        private _tableDefinitionsService: TableDefinitionsService,
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

        this._tableDefinitionsService
            .getTableDefinitions(
                this._tableDefinitionsService
                    .generateTableDeinitionIdentifier(HistoricoConfigListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((definitions: TableDefinitions) => {
                if (!definitions) {
                    this.tableDefinitions = new TableDefinitions();
                    this.tableDefinitions.version = CdkHistoricoGridColumns.version;
                } else {
                    this.tableDefinitions = definitions;
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadHistoricoConfig());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        const parametros = {
            ...params,
            gridFilter: {
                ...params.gridFilter,
                'criadoPor.id': 'eq:' + this._loginService.getUserProfile().id
            }
        };
        if (parametros.gridFilter.andX) {
            this._store.dispatch(new fromStore.GetHistoricoConfig({
                ...this.pagination,
                filter: {
                    ...this.pagination.filter,
                },
                gridFilter: {
                    ...parametros.gridFilter
                },
                sort: parametros.sort,
                limit: parametros.limit,
                offset: parametros.offset,
                populate: [
                    ...this.pagination.populate
                ],
                context: parametros.context,
            }));
        }
    }

    doTableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        tableDefinitions.identifier = this._tableDefinitionsService
            .generateTableDeinitionIdentifier(HistoricoConfigListComponent.GRID_DEFINITIONS_KEYS);

        this._tableDefinitionsService.saveTableDefinitions(tableDefinitions);
    }

    doResetTableDefinitions(): void {
        this.reload({
            ...this.pagination,
            sort: {},
            limit: 10
        });
    }
}
