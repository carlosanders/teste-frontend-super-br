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

import {GarantiaAdministrativo} from '@cdk/models/garantia-administrativo.model';
import {GarantiaAdministrativoDataSource} from '@cdk/data-sources/garantia-administrativo-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-garantia-administrativo-grid',
    templateUrl: './cdk-garantia-administrativo-grid.component.html',
    styleUrls: ['./cdk-garantia-administrativo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGarantiaAdministrativoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    garantiasAdministrativos: GarantiaAdministrativo[];

    @Input()
    total = 0;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'glossario', 'actions'];

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
            id: 'glossario',
            label: 'Glossário',
            fixed: false
        },
        {
            id: 'dispositivoLegal',
            label: 'Dispositivo Legal',
            fixed: false
        },
        {
            id: 'codigoCNJ',
            label: 'Código CNJ',
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
    selected = new EventEmitter<GarantiaAdministrativo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: GarantiaAdministrativoDataSource;

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
        this.garantiasAdministrativos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new GarantiaAdministrativoDataSource(of(this.garantiasAdministrativos));
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

        this.dataSource = new GarantiaAdministrativoDataSource(of(this.garantiasAdministrativos));

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
        this._fuseSidebarService.getSidebar('cdk-garantia-administrativo--main-sidebar').toggleOpen();
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

    editGarantiaAdministrativo(garantiaAdministrativoId): void {
        this.edit.emit(garantiaAdministrativoId);
    }

    selectGarantiaAdministrativo(garantiaAdministrativo: GarantiaAdministrativo): void {
        this.selected.emit(garantiaAdministrativo);
    }

    deleteGarantiaAdministrativo(garantiaAdministrativoId): void {
        this.delete.emit(garantiaAdministrativoId);
    }

    deleteGarantiasAdministrativos(garantiasAdministrativosId): void {
        garantiasAdministrativosId.forEach(garantiaAdministrativoId => this.deleteGarantiaAdministrativo(garantiaAdministrativoId));
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
        const arr = Object.keys(this.garantiasAdministrativos).map(k => this.garantiasAdministrativos[k]);
        this.selectedIds = arr.map(garantiaAdministrativo => garantiaAdministrativo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(garantiaAdministrativoId): void {
        const selectedGarantiaAdministrativoIds = [...this.selectedIds];

        if (selectedGarantiaAdministrativoIds.find(id => id === garantiaAdministrativoId) !== undefined) {
            this.selectedIds = selectedGarantiaAdministrativoIds.filter(id => id !== garantiaAdministrativoId);
        } else {
            this.selectedIds = [...selectedGarantiaAdministrativoIds, garantiaAdministrativoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.garantiasAdministrativos.length && this.selectedIds.length > 0);
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
