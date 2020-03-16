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

import {AssuntoAdministrativo} from '@cdk/models';
import {AssuntoAdministrativoDataSource} from '@cdk/data-sources/assunto-administrativo-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-assunto-administrativo-grid',
    templateUrl: './cdk-assunto-administrativo-grid.component.html',
    styleUrls: ['./cdk-assunto-administrativo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAssuntoAdministrativoGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    assuntosAdministrativos: AssuntoAdministrativo[];

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
    selected = new EventEmitter<AssuntoAdministrativo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: AssuntoAdministrativoDataSource;

    showFilter = false;

    gridFilter: any;

    hasSelected = false;
    isIndeterminate = false;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService
    ) {
        this.gridFilter = {};
        this.assuntosAdministrativos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new AssuntoAdministrativoDataSource(of(this.assuntosAdministrativos));
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

        this.dataSource = new AssuntoAdministrativoDataSource(of(this.assuntosAdministrativos));

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
        this._cdkSidebarService.getSidebar('cdk-assunto-administrativo--main-sidebar').toggleOpen();
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

    editAssuntoAdministrativo(assuntoAdministrativoId): void {
        this.edit.emit(assuntoAdministrativoId);
    }

    selectAssuntoAdministrativo(assuntoAdministrativo: AssuntoAdministrativo): void {
        this.selected.emit(assuntoAdministrativo);
    }

    deleteAssuntoAdministrativo(assuntoAdministrativoId): void {
        this.delete.emit(assuntoAdministrativoId);
    }

    deleteAssuntosAdministrativos(assuntosAdministrativosId): void {
        assuntosAdministrativosId.forEach(assuntoAdministrativoId => this.deleteAssuntoAdministrativo(assuntoAdministrativoId));
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
        const arr = Object.keys(this.assuntosAdministrativos).map(k => this.assuntosAdministrativos[k]);
        this.selectedIds = arr.map(assuntoAdministrativo => assuntoAdministrativo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(assuntoAdministrativoId): void {
        const selectedAssuntoAdministrativoIds = [...this.selectedIds];

        if (selectedAssuntoAdministrativoIds.find(id => id === assuntoAdministrativoId) !== undefined) {
            this.selectedIds = selectedAssuntoAdministrativoIds.filter(id => id !== assuntoAdministrativoId);
        } else {
            this.selectedIds = [...selectedAssuntoAdministrativoIds, assuntoAdministrativoId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.assuntosAdministrativos.length && this.selectedIds.length > 0);
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
