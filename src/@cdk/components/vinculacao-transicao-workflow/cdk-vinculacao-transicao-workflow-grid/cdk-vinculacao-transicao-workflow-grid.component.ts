import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {merge, of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Processo, VinculacaoTransicaoWorkflow} from '@cdk/models';
import {VinculacaoTransicaoWorkflowDataSource} from '@cdk/data-sources/vinculacao-transicao-workflow-data-source';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {LoginService} from 'app/main/auth/login/login.service';

@Component({
    selector: 'cdk-vinculacao-transicao-workflow-grid',
    templateUrl: './cdk-vinculacao-transicao-workflow-grid.component.html',
    styleUrls: ['./cdk-vinculacao-transicao-workflow-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoTransicaoWorkflowGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacoesTransicaoWorkflow: VinculacaoTransicaoWorkflow[];

    @Input()
    processoRef: Processo;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    view = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = [
        'select',
        'id',
        'workflow.nome',
        'workflow.descricao',
        'transicaoWorkflow.workflow.nome',
        'transicaoWorkflow.especieTarefaFrom.nome',
        'transicaoWorkflow.especieTarefaTo.nome',
        'transicaoWorkflow.especieAtividade.nome',
        'actions'
    ];

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
            id: 'transicaoWorkflow.workflow.nome',
            label: 'Workflow Pai',
            fixed: true
        },
        {
            id: 'transicaoWorkflow.especieTarefaFrom.nome',
            label: 'Espécie Tarefa Transição De',
            fixed: true
        },
        {
            id: 'transicaoWorkflow.especieTarefaTo.nome',
            label: 'Espécie Tarefa Transição Para',
            fixed: true
        },
        {
            id: 'transicaoWorkflow.especieAtividade.nome',
            label: 'Espécie Atividade Transição',
            fixed: true
        },
        {
            id: 'workflow.nome',
            label: 'Sub Workflow',
            fixed: true
        },
        {
            id: 'workflow.descricao',
            label: 'Descrição Sub Workflow',
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
    deletingErrors: any = {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'delete', 'select', 'view'];

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
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    selected = new EventEmitter<VinculacaoTransicaoWorkflow>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoTransicaoWorkflowDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _dialog
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _dialog: MatDialog,
        private _loginService: LoginService
    ) {
        this.gridFilter = {};
        this.vinculacoesTransicaoWorkflow = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoTransicaoWorkflowDataSource(of(this.vinculacoesTransicaoWorkflow));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new VinculacaoTransicaoWorkflowDataSource(of(this.vinculacoesTransicaoWorkflow));

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
        this._cdkSidebarService.getSidebar('cdk-vinculacao-transicao-workflow-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            gridFilter: filter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
            context: contexto
        });
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

    editVinculacaoTransicaoWorkflow(vinculacaoTransicaoWorkflowId): void {
        this.edit.emit(vinculacaoTransicaoWorkflowId);
    }

    selectVinculacaoTransicaoWorkflow(vinculacaoTransicaoWorkflow: VinculacaoTransicaoWorkflow): void {
        this.selected.emit(vinculacaoTransicaoWorkflow);
    }

    deleteVinculacaoTransicaoWorkflow(vinculacaoTransicaoWorkflowId): void {
        this.delete.emit(vinculacaoTransicaoWorkflowId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
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
        const arr = Object.keys(this.vinculacoesTransicaoWorkflow).map(k => this.vinculacoesTransicaoWorkflow[k]);
        this.selectedIds = arr.map(vinculacaoTransicaoWorkflow => vinculacaoTransicaoWorkflow.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoTransicaoWorkflowId): void {
        const selectedVinculacaoTransicaoWorkflowIds = [...this.selectedIds];

        if (selectedVinculacaoTransicaoWorkflowIds.find(id => id === vinculacaoTransicaoWorkflowId) !== undefined) {
            this.selectedIds = selectedVinculacaoTransicaoWorkflowIds.filter(id => id !== vinculacaoTransicaoWorkflowId);
        } else {
            this.selectedIds = [...selectedVinculacaoTransicaoWorkflowIds, vinculacaoTransicaoWorkflowId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacoesTransicaoWorkflow.length && this.selectedIds.length > 0);
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

    getProp(obj, prop): any|boolean {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }

    getMessageError(obj): any {
        return obj?.error?.error?.message;
   }
}
