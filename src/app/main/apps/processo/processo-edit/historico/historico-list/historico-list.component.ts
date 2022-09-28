import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Historico} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {filter, takeUntil} from 'rxjs/operators';
import {TableDefinitions} from "../../../../../../../@cdk/components/table-definitions/table-definitions";
import {
    CdkTarefaGridColumns
} from "../../../../../../../@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.columns";
import {
    TableDefinitionsService
} from "../../../../../../../@cdk/components/table-definitions/table-definitions.service";

@Component({
    selector: 'historico-list',
    templateUrl: './historico-list.component.html',
    styleUrls: ['./historico-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class HistoricoListComponent implements OnInit, OnDestroy {

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['processo', 'processo-edit', 'HistoricoListComponent', 'CdkHistoricoGrid'];
    static readonly LIST_DEFINITIONS_KEY:string = 'processoEditHistoricoListDefinitions';

    routerState: any;
    historicos$: Observable<Historico[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    private _unsubscribeAll: Subject<any> = new Subject();
    tableDefinitions: TableDefinitions = new TableDefinitions();

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.HistoricoListAppState>,
        private _tableDefinitionsService: TableDefinitionsService,
    ) {
        this.historicos$ = this._store.pipe(select(fromStore.getHistoricoList));
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
                    .generateTableDeinitionIdentifier(HistoricoListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((definitions: TableDefinitions) => {
                if (!definitions) {
                    this.tableDefinitions = new TableDefinitions();
                    this.tableDefinitions.version = CdkTarefaGridColumns.version;
                } else {
                    this.tableDefinitions = definitions;
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadHistoricos());
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetHistoricos({
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

    doTableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        tableDefinitions.identifier = this._tableDefinitionsService
            .generateTableDeinitionIdentifier(HistoricoListComponent.GRID_DEFINITIONS_KEYS);

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
