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

import {NumeroUnicoDocumento} from '@cdk/models';
import {NumeroUnicoDocumentoDataSource} from '@cdk/data-sources/numero-unico-documento-data-source';
import {FormControl} from '@angular/forms';
import {Pagination} from "@cdk/models";

@Component({
    selector: 'cdk-numero-unico-documento-grid',
    templateUrl: './cdk-numero-unico-documento-grid.component.html',
    styleUrls: ['./cdk-numero-unico-documento-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkNumeroUnicoDocumentoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    numerosUnicosDocumento: NumeroUnicoDocumento[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['id', 'tipoDocumento.nome', 'setor.unidade.nome', 'setor.nome', 'sequencia', 'ano', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: false
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true
        },
        {
            id: 'tipoDocumento.nome',
            label: 'Tipo Documento',
            fixed: true
        },
        {
            id: 'setor.nome',
            label: 'Setor',
            fixed: true
        },
        {
            id: 'setor.unidade.nome',
            label: 'Unidade',
            fixed: true
        },
        {
            id: 'sequencia',
            label: 'Sequência',
            fixed: false
        },
        {
            id: 'ano',
            label: 'Ano',
            fixed: true
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
    actions: string[] = ['edit', 'select'];

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
    selected = new EventEmitter<NumeroUnicoDocumento>();

    @Output()
    selectedIds: number[] = [];

    dataSource: NumeroUnicoDocumentoDataSource;

    @Input()
    setorPagination: Pagination;

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
        this.numerosUnicosDocumento = [];
    }

    ngOnChanges(): void {
        this.dataSource = new NumeroUnicoDocumentoDataSource(of(this.numerosUnicosDocumento));
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

        this.dataSource = new NumeroUnicoDocumentoDataSource(of(this.numerosUnicosDocumento));

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
        this._cdkSidebarService.getSidebar('cdk-numero-unico-documento-main-sidebar').toggleOpen();
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

    editNumeroUnicoDocumento(numeroUnicoDocumentoId): void {
        this.edit.emit(numeroUnicoDocumentoId);
    }

    selectNumeroUnicoDocumento(numeroUnicoDocumento: NumeroUnicoDocumento): void {
        this.selected.emit(numeroUnicoDocumento);
    }

    deleteNumeroUnicoDocumento(numeroUnicoDocumentoId): void {
        this.delete.emit(numeroUnicoDocumentoId);
    }

    deleteLotacoes(numerosUnicosDocumentoId): void {
        numerosUnicosDocumentoId.forEach(numeroUnicoDocumentoId => this.deleteNumeroUnicoDocumento(numeroUnicoDocumentoId));
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
        const arr = Object.keys(this.numerosUnicosDocumento).map(k => this.numerosUnicosDocumento[k]);
        this.selectedIds = arr.map(numeroUnicoDocumento => numeroUnicoDocumento.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(numeroUnicoDocumentoId): void {
        const selectedNumeroUnicoDocumentoIds = [...this.selectedIds];

        if (selectedNumeroUnicoDocumentoIds.find(id => id === numeroUnicoDocumentoId) !== undefined) {
            this.selectedIds = selectedNumeroUnicoDocumentoIds.filter(id => id !== numeroUnicoDocumentoId);
        } else {
            this.selectedIds = [...selectedNumeroUnicoDocumentoIds, numeroUnicoDocumentoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.numerosUnicosDocumento.length && this.selectedIds.length > 0);
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