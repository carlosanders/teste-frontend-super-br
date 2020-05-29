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

import {Setor} from '@cdk/models';
import {SetorDataSource} from '@cdk/data-sources/setor-data-source';
import {FormControl} from '@angular/forms';
import {TipoRelatorio} from '@cdk/models/tipo-relatorio.model';

@Component({
    selector: 'cdk-tipo-relatorio-grid',
    templateUrl: './cdk-tipo-relatorio-grid.component.html',
    styleUrls: ['./cdk-tipo-relatorio-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkTipoRelatorioGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    tiposRelatorios: TipoRelatorio[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'actions'];

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
            id: 'nome',
            label: 'Nome',
            fixed: true
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
    actions: string[] = ['edit', 'delete', 'select', 'lotacoes', 'localizadores', 'numeros-unicos-documentos'];

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
    lotacoes = new EventEmitter<number>();

    @Output()
    tiposRelatoriosEvent = new EventEmitter<number>();

    @Output()
    localizadores = new EventEmitter<number>();

    @Output()
    competencias = new EventEmitter<number>();

    @Output()
    numerosUnicosDocumentos = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Setor>();

    @Output()
    selectedIds: number[] = [];

    dataSource: SetorDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     *
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.tiposRelatorios = [];
    }

    ngOnChanges(): void {
        this.dataSource = new SetorDataSource(of(this.tiposRelatorios));
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

        this.dataSource = new SetorDataSource(of(this.tiposRelatorios));

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
        this._cdkSidebarService.getSidebar('cdk-tipo-relatorio-filter').toggleOpen();
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

    editSetor(setorId): void {
        this.edit.emit(setorId);
    }

    lotacoesSetor(setorId): void {
        this.lotacoes.emit(setorId);
    }

    tiposRelatoriosUnidade(unidadeId): void {
        this.tiposRelatoriosEvent.emit(unidadeId);
    }

    competenciasUnidade(unidadeId): void {
        this.competencias.emit(unidadeId);
    }

    localizadoresSetor(setorId): void {
        this.localizadores.emit(setorId);
    }

    numerosUnicosDocumentosSetor(setorId): void {
        this.numerosUnicosDocumentos.emit(setorId);
    }

    selectSetor(setor: Setor): void {
        this.selected.emit(setor);
    }

    deleteSetor(setorId): void {
        this.delete.emit(setorId);
    }

    deleteTiposRelatorios(tiposRelatoriosId): void {
        tiposRelatoriosId.forEach(setorId => this.deleteSetor(setorId));
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
        const arr = Object.keys(this.tiposRelatorios).map(k => this.tiposRelatorios[k]);
        this.selectedIds = arr.map(setor => setor.id);
        this.recompute();
    }

    /**
     * Deselect all relatorios
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(setorId): void {
        const selectedSetorIds = [...this.selectedIds];

        if (selectedSetorIds.find(id => id === setorId) !== undefined) {
            this.selectedIds = selectedSetorIds.filter(id => id !== setorId);
        } else {
            this.selectedIds = [...selectedSetorIds, setorId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.tiposRelatorios.length && this.selectedIds.length > 0);
    }

    setFilter(gridFilter): void {
        this.gridFilter = gridFilter;
        this.paginator.pageIndex = 0;
        this.loadPage();
    }

    doCreate(): void {
        this.create.emit();
    }

    doCancel(): void {
        this.cancel.emit();
    }
}
