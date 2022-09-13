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
import {Tramitacao, Usuario} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {TableDefinitions} from "../../../../../../../@cdk/components/table-definitions/table-definitions";
import {
    TableDefinitionsService
} from "../../../../../../../@cdk/components/table-definitions/table-definitions.service";
import {
    CdkTarefaGridColumns
} from "../../../../../../../@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.columns";
import {
    CdkRemessaGridColumns
} from "../../../../../../../@cdk/components/remessa/cdk-remessa-grid/cdk-remessa-grid.columns";

@Component({
    selector: 'remessa-list',
    templateUrl: './remessa-list.component.html',
    styleUrls: ['./remessa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemessaListComponent implements OnInit, OnDestroy {

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['processo', 'RemessaListComponent', 'CdkRemessaGrid'];

    routerState: any;
    tramitacoes$: Observable<Tramitacao[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;

    _profile: Usuario;
    private _unsubscribeAll: Subject<any> = new Subject();
    tableDefinitions: TableDefinitions = new TableDefinitions();
    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     * @param _tableDefinitionsService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.RemessaListAppState>,
        public _loginService: LoginService,
        private _tableDefinitionsService: TableDefinitionsService,
    ) {
        this._profile = this._loginService.getUserProfile();

        this.tramitacoes$ = this._store.pipe(select(fromStore.getRemessaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

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
                    .generateTableDeinitionIdentifier(RemessaListComponent.GRID_DEFINITIONS_KEYS)
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((definitions: TableDefinitions) => {
                if (!definitions) {
                    this.tableDefinitions = new TableDefinitions();
                    this.tableDefinitions.version = CdkRemessaGridColumns.version;
                } else {
                    this.tableDefinitions = definitions;
                }
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetTramitacoes({
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
        this._store.dispatch(new fromStore.GetTramitacoes({
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

    edit(tramitacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + tramitacaoId]).then();
    }

    recebimento(tramitacaoId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'recebimento/') + tramitacaoId]).then();
    }

    verificaStatusBarramento(tramitacaoId: number[]): void {
        this._router.navigate([this.routerState.url.replace('listar', 'status-barramento-processo/') +
        tramitacaoId]).then();
    }

    delete(tramitacaoId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteTramitacao({
            tramitacaoId: tramitacaoId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    doTableDefinitionsChange(tableDefinitions: TableDefinitions): void {
        tableDefinitions.identifier = this._tableDefinitionsService
            .generateTableDeinitionIdentifier(RemessaListComponent.GRID_DEFINITIONS_KEYS);

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
