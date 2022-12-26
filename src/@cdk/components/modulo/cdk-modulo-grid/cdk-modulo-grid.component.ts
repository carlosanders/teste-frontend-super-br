import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    ViewEncapsulation,
    Input,
    OnChanges,
    Output,
    EventEmitter
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {merge, of} from 'rxjs';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {Modulo} from '../../../models';
import {ModuloDataSource} from '../../../data-sources/modulo-data-source';

@Component({
    selector: 'cdk-modulo-grid',
    templateUrl: './cdk-modulo-grid.component.html',
    styleUrls: ['./cdk-modulo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModuloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modulos: Modulo[];

    @Input()
    total = 0;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = [
        'select',
        'id',
        'nome',
        'descricao',
        'sigla',
        'ativo',
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
            id: 'nome',
            label: 'Nome',
            fixed: true
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false
        },
        {
            id: 'sigla',
            label: 'Sigla',
            fixed: false
        },
        {
            id: 'ativo',
            label: 'Ativo',
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
    pageSize = 10;

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
    selected = new EventEmitter<Modulo>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModuloDataSource;

    gridFilter: any;

    showFilter = false;
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
        this.modulos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModuloDataSource(of(this.modulos));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        const ElementQueries = require('css-element-queries/src/ElementQueries');
        ElementQueries.listen();
        ElementQueries.init();
        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ModuloDataSource(of(this.modulos));
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
        this._cdkSidebarService.getSidebar('cdk-modulo-filter').toggleOpen();
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
                context: {'mostrarApagadas': true}
            });
        } else {
            this.loadPage();
        }
    }

    editFundamentoLegal(moduloId): void {
        this.edit.emit(moduloId);
    }

    selectFundamentoLegal(modulo: Modulo): void {
        this.selected.emit(modulo);
    }

    deleteFundamentoLegal(moduloId): void {
        this.delete.emit(moduloId);
    }

    deleteFundamentoLegals(modulosId): void {
        modulosId.forEach(fundamentoLegalId => this.deleteFundamentoLegal(fundamentoLegalId));
    }

    toggleSelectAll(ev): void {
        ev.preventDefault();

        if (this.selectedIds.length && this.selectedIds.length > 0) {
            this.deselectAll();
        } else {
            this.selectAll();
        }
    }

    selectAll(): void {
        const arr = Object.keys(this.modulos).map(k => this.modulos[k]);
        this.selectedIds = arr.map(modulo => modulo.id);
        this.recompute();
    }

    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(moduloId): void {
        const selectedModulosId = [...this.selectedIds];

        if (selectedModulosId.find(id => id === moduloId) !== undefined) {
            this.selectedIds = selectedModulosId.filter(id => id !== moduloId);
        } else {
            this.selectedIds = [...selectedModulosId, moduloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modulos.length && this.selectedIds.length > 0);
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
