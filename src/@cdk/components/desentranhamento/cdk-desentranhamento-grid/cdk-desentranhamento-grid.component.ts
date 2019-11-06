import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit, ViewChild, AfterViewInit,
    ViewEncapsulation, Input, OnChanges, Output, EventEmitter
} from '@angular/core';
import {merge, of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {MatPaginator, MatSort} from '@angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

import {Desentranhamento} from '@cdk/models/desentranhamento.model';
import {DesentranhamentoDataSource} from '@cdk/data-sources/desentranhamento-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-desentranhamento-grid',
    templateUrl: './cdk-desentranhamento-grid.component.html',
    styleUrls: ['./cdk-desentranhamento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkDesentranhamentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    desentranhamentos: Desentranhamento[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'juntada.descricao', 'processoDestino.NUP', 'observacao', 'actions'];

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
            id: 'juntada.descricao',
            label: 'Juntada',
            fixed: true
        },
        {
            id: 'processoDestino.NUP',
            label: 'NUP',
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
    selected = new EventEmitter<Desentranhamento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: DesentranhamentoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService
    ) {
        this.gridFilter = {};
        this.desentranhamentos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new DesentranhamentoDataSource(of(this.desentranhamentos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {

        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
        this.paginator._intl.nextPageLabel = 'Seguinte';
        this.paginator._intl.previousPageLabel = 'Anterior';

        this.paginator.pageSize = this.pageSize;

        this.dataSource = new DesentranhamentoDataSource(of(this.desentranhamentos));

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
        this._fuseSidebarService.getSidebar('cdk-desentranhamento-main-sidebar').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        this.reload.emit({
            gridFilter: this.gridFilter,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            sort: this.sort.active ? {[this.sort.active]: this.sort.direction} : {}
        });
    }

    editDesentranhamento(desentranhamentoId): void {
        this.edit.emit(desentranhamentoId);
    }

    selectDesentranhamento(desentranhamento: Desentranhamento): void {
        this.selected.emit(desentranhamento);
    }

    deleteDesentranhamento(desentranhamentoId): void {
        this.delete.emit(desentranhamentoId);
    }

    deleteDesentranhamentos(desentranhamentosId): void {
        desentranhamentosId.forEach(desentranhamentoId => this.deleteDesentranhamento(desentranhamentoId));
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
        const arr = Object.keys(this.desentranhamentos).map(k => this.desentranhamentos[k]);
        this.selectedIds = arr.map(desentranhamento => desentranhamento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(desentranhamentoId): void {
        const selectedDesentranhamentoIds = [...this.selectedIds];

        if (selectedDesentranhamentoIds.find(id => id === desentranhamentoId) !== undefined) {
            this.selectedIds = selectedDesentranhamentoIds.filter(id => id !== desentranhamentoId);
        } else {
            this.selectedIds = [...selectedDesentranhamentoIds, desentranhamentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.desentranhamentos.length && this.selectedIds.length > 0);
    }

    setGridFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
