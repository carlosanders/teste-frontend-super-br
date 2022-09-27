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
import {Tarefa} from '@cdk/models';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {TableDefinitions} from "../../../../../../../@cdk/components/table-definitions/table-definitions";
import {
    TableDefinitionsService
} from "../../../../../../../@cdk/components/table-definitions/table-definitions.service";
import {
    CdkTarefaGridColumns
} from "../../../../../../../@cdk/components/tarefa/cdk-tarefa-grid/cdk-tarefa-grid.columns";
import {modulesConfig} from "../../../../../../../modules/modules-config";

@Component({
    selector: 'tarefa-list',
    templateUrl: './tarefa-list.component.html',
    styleUrls: ['./tarefa-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TarefaListComponent implements OnInit, OnDestroy {

    static readonly GRID_DEFINITIONS_KEYS: string[] = ['processo', 'TarefaListComponent', 'CdkTarefaGrid'];

    routerState: any;
    tarefas$: Observable<Tarefa[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tableDefinitions: TableDefinitions = new TableDefinitions();
    generoTarefa = 'administrativo';

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _tableDefinitionsService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.TarefaListAppState>,
        private _tableDefinitionsService: TableDefinitionsService,
    ) {
        this.tarefas$ = this._store.pipe(select(fromStore.getTarefaList));
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
                    .generateTableDeinitionIdentifier(TarefaListComponent.GRID_DEFINITIONS_KEYS)
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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadTarefas());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetTarefas({
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
        this._store.dispatch(new fromStore.GetTarefas({
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
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    edit(tarefaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + tarefaId]).then();
    }

    listAtividades(tarefa: any): void {
        const genero = tarefa.especieTarefa.generoTarefa.nome.toLowerCase();
        const path = 'app/main/apps/processo/processo-edit/tarefas/tarefa-list';
        if (modulesConfig.length > 0) {
            modulesConfig.forEach((module) => {
                if (module.routerLinks.hasOwnProperty(path) &&
                    module.routerLinks[path].hasOwnProperty('atividades') &&
                    module.routerLinks[path]['atividades'].hasOwnProperty(genero)) {
                    this._router.navigate([this.routerState.url.replace(
                        'listar',
                        module.routerLinks[path]['atividades'][genero]) + tarefa.id]).then();
                } else {
                    this._router.navigate([this.routerState.url.replace('listar', 'atividades/') + tarefa.id]).then();
                }
            });
        } else {
            this._router.navigate([this.routerState.url.replace('listar', 'atividades/') + tarefa.id]).then();
        }
    }

    listCompartilhamentos(tarefaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'compartilhamentos/') + tarefaId]).then();
    }

    delete(tarefaId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteTarefa({
            tarefaId: tarefaId,
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
            .generateTableDeinitionIdentifier(TarefaListComponent.GRID_DEFINITIONS_KEYS);

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
