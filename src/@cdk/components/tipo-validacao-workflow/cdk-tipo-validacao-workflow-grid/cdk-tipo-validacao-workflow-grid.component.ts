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
import {TipoValidacaoWorkflow} from '@cdk/models';
import {TipoValidacaoWorkflowDataSource} from '@cdk/data-sources/tipo-validacao-workflow-data-source';
import {FormControl} from '@angular/forms';
import {CdkTipoValidacaoWorkflowFilterComponent} from '../sidebars/cdk-tipo-validacao-workflow-filter/cdk-tipo-validacao-workflow-filter.component';


@Component({
    selector: 'cdk-tipo-validacao-workflow-grid',
    templateUrl: './cdk-tipo-validacao-workflow-grid.component.html',
    styleUrls: ['./cdk-tipo-validacao-workflow-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoValidacaoWorkflowGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tipoValidacaoWorkflows: TipoValidacaoWorkflow[];

    showFilter = false;

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'valor', 'descricao', 'ativo', 'actions'];

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
            id: 'valor',
            label: 'Valor',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
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
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild(CdkTipoValidacaoWorkflowFilterComponent)
    cdkTipoValidacaoWorkflowFilterComponent: CdkTipoValidacaoWorkflowFilterComponent;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    inatived = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<TipoValidacaoWorkflow>();

    @Output()
    selectedIds: number[] = [];

    dataSource: TipoValidacaoWorkflowDataSource;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    hasInatived = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.tipoValidacaoWorkflows = [];
    }

    ngOnChanges(): void {
        this.dataSource = new TipoValidacaoWorkflowDataSource(of(this.tipoValidacaoWorkflows));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();

        this.paginator.pageSize = this.pageSize;
        this.dataSource = new TipoValidacaoWorkflowDataSource(of(this.tipoValidacaoWorkflows));

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
        this._cdkSidebarService.getSidebar('cdk-tipo-validacao-workflow-edit-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ? this.gridFilter.contexto : {};
        contexto['isAdmin'] = this.hasInatived;
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

    loadInatived(): void {
        this.hasInatived = !this.hasInatived;
        if (this.hasInatived) {
            const filter = this.gridFilter.filters;
            this.inatived.emit({
                gridFilter: filter,
                limit: this.paginator.pageSize,
                offset: (this.paginator.pageSize * this.paginator.pageIndex),
                sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {},
                context: {isAdmin: true}
            });
        }
        else {
            this.gridFilter = {};
            this.cdkTipoValidacaoWorkflowFilterComponent.resetarFormulario();
            this.loadPage();
        }
    }

    editTipoValidacaoWorkflow(tipoValidacaoWorkflowId): void {
        this.edit.emit(tipoValidacaoWorkflowId);
    }

    selectTipoValidacaoWorkflow(tipoValidacaoWorkflow: TipoValidacaoWorkflow): void {
        this.selected.emit(tipoValidacaoWorkflow);
    }

    deleteTipoValidacaoWorkflow(tipoValidacaoWorkflowId): void {
        this.delete.emit(tipoValidacaoWorkflowId);
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
        const arr = Object.keys(this.tipoValidacaoWorkflows).map(k => this.tipoValidacaoWorkflows[k]);
        this.selectedIds = arr.map(tipoValidacaoWorkflow => tipoValidacaoWorkflow.id);
        this.recompute();
    }

    /**
     * Deselect all
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(tipoValidacaoWorkflowId): void {
        const selectedTipoValidacaoWorkflowIds = [...this.selectedIds];

        if (selectedTipoValidacaoWorkflowIds.find(id => id === tipoValidacaoWorkflowId) !== undefined) {
            this.selectedIds = selectedTipoValidacaoWorkflowIds.filter(id => id !== tipoValidacaoWorkflowId);
        } else {
            this.selectedIds = [...selectedTipoValidacaoWorkflowIds, tipoValidacaoWorkflowId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tipoValidacaoWorkflows.length && this.selectedIds.length > 0);
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
