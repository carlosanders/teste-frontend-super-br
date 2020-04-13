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

import {VinculacaoProcesso} from '@cdk/models';
import {VinculacaoProcessoDataSource} from '@cdk/data-sources/vinculacao-processo-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-vinculacao-processo-grid',
    templateUrl: './cdk-vinculacao-processo-grid.component.html',
    styleUrls: ['./cdk-vinculacao-processo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVinculacaoProcessoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    vinculacoesProcessos: VinculacaoProcesso[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'processo.NUP', 'processoVinculado.NUP', 'modalidadeVinculacaoProcesso.valor',
        'observacao', 'actions'];

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
            id: 'processo.NUP',
            label: 'NUP',
            fixed: true
        },
        {
            id: 'processoVinculado.NUP',
            label: 'Processo Vinculado',
            fixed: false
        },
        {
            id: 'modalidadeVinculacaoProcesso.valor',
            label: 'Modalidade da Vinculacao do Processo',
            fixed: false
        },
        {
            id: 'observacao',
            label: 'Observação',
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
    pageSize = 5;

    @Input()
    actions: string[] = ['edit', 'delete', 'select'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    edit = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<VinculacaoProcesso>();

    @Output()
    selectedIds: number[] = [];

    dataSource: VinculacaoProcessoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.vinculacoesProcessos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));
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

        this.dataSource = new VinculacaoProcessoDataSource(of(this.vinculacoesProcessos));

        this.columns.setValue(this.allColumns.map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.allColumns.forEach(c => {
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
        this._cdkSidebarService.getSidebar('cdk-vinculacao-processo-filter').toggleOpen();
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
    }

    editVinculacaoProcesso(vinculacaoProcessoId): void {
        this.edit.emit(vinculacaoProcessoId);
    }

    selectVinculacaoProcesso(vinculacaoProcesso: VinculacaoProcesso): void {
        this.selected.emit(vinculacaoProcesso);
    }

    deleteVinculacaoProcesso(vinculacaoProcessoId): void {
        this.delete.emit(vinculacaoProcessoId);
    }

    deleteVinculacaoProcessos(vinculacoesProcessosId): void {
        vinculacoesProcessosId.forEach(vinculacaoProcessoId => this.deleteVinculacaoProcesso(vinculacaoProcessoId));
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
        const arr = Object.keys(this.vinculacoesProcessos).map(k => this.vinculacoesProcessos[k]);
        this.selectedIds = arr.map(vinculacaoProcesso => vinculacaoProcesso.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(vinculacaoProcessoId): void {
        const selectedVinculacaoProcessoIds = [...this.selectedIds];

        if (selectedVinculacaoProcessoIds.find(id => id === vinculacaoProcessoId) !== undefined) {
            this.selectedIds = selectedVinculacaoProcessoIds.filter(id => id !== vinculacaoProcessoId);
        } else {
            this.selectedIds = [...selectedVinculacaoProcessoIds, vinculacaoProcessoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.vinculacoesProcessos.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
