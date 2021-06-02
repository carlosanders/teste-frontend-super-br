import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {TransicaoWorkflow} from '@cdk/models';
import {TransicaoWorkflowDataSource} from '@cdk/data-sources/transicao-workflow-data-source';
import {Favorito} from '@cdk/models';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-transicao-workflow-grid',
    templateUrl: './cdk-transicao-workflow-grid.component.html',
    styleUrls: ['./cdk-transicao-workflow-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTransicaoWorkflowGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    transicoesWorkflows: TransicaoWorkflow[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'especieTarefaFrom.nome', 'especieAtividade.nome', 'especieTarefaTo.nome', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'especieTarefaFrom.nome',
            label: 'Espécie Tarefa From',
            fixed: false
        },
        {
            id: 'especieAtividade.nome',
            label: 'Espécie Atividade',
            fixed: false
        },
        {
            id: 'especieTarefaTo.nome',
            label: 'Espécie Tarefa To',
            fixed: false
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'regras', 'actions'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    regras = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    acoes = new EventEmitter<number>();

    @Output()
    toggleFavorito = new EventEmitter<Favorito>();

    @Output()
    selected = new EventEmitter<TransicaoWorkflow>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TransicaoWorkflowDataSource;

    @Input()
    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.transicoesWorkflows = [];
    }

    ngOnChanges(): void {
        this.dataSource = new TransicaoWorkflowDataSource(of(this.transicoesWorkflows));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const ElementQueries = require('css-element-queries/src/ElementQueries');
        ElementQueries.listen();
        ElementQueries.init();

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new TransicaoWorkflowDataSource(of(this.transicoesWorkflows));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach((c) => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    ngAfterViewInit(): void {
        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(
            this.sort.sortChange,
            this.paginator.page
        ).pipe(
            tap(() => this.loadPage())
        ).subscribe();
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-transicao-workflow-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : null;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
        this.hasExcluded = false;
    }

    loadExcluded(): void {
        this.hasExcluded = !this.hasExcluded;
        if (this.hasExcluded) {
            const filter = this.gridFilter.filters;
            this.excluded.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {mostrarApagadas: true}
            });
        }
        else {
            this.loadPage();
        }
    }

    editTransicaoWorkflow(transicaoWorkflowId): void {
        this.edit.emit(transicaoWorkflowId);
    }

    regrasTransicaoWorkflow(transicaoWorkflowId): void {
        this.regras.emit(transicaoWorkflowId);
    }

    selectTransicaoWorkflow(transicaoWorkflow: TransicaoWorkflow): void {
        this.selected.emit(transicaoWorkflow);
    }

    deleteTransicaoWorkflow(transicaoWorkflowId): void {
        this.delete.emit(transicaoWorkflowId);
    }

    deleteTransicoesWorkflows(transicoesWorkflowsId): void {
        transicoesWorkflowsId.forEach(workflowId => this.deleteTransicaoWorkflow(workflowId));
    }

    acaoTransicaoWorkflowList(transicaoWorkflowId): void {
        this.acoes.emit(transicaoWorkflowId);
    }

    salvarFavorito(favorito): void {
       this.toggleFavorito.emit(favorito);
    }

    /**
     * Toggle select all
     *
     * @param ev
     */
    toggleSelectAll(ev): void {
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    /**
     * Select all
     */
    selectAll(): void {
        const arr = Object.keys(this.transicoesWorkflows).map(k => this.transicoesWorkflows[k]);
        this.selectedIds = arr.map(workflow => workflow.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(workflowId): void {
        const selectedWorkflowIds = [...this.selectedIds];

        if (selectedWorkflowIds.find(id => id === workflowId) !== undefined) {
            this.selectedIds = selectedWorkflowIds.filter(id => id !== workflowId);
        } else {
            this.selectedIds = [...selectedWorkflowIds, workflowId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.transicoesWorkflows.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }

    doCreate(): void {
        this.create.emit();
    }

    getProp(obj, prop) {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }
}
