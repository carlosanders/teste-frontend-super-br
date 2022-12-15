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
import {FormControl} from '@angular/forms';
import {merge, Observable, of} from 'rxjs';
import {MatPaginator, MatSort} from '@cdk/angular/material';
import {debounceTime, distinctUntilChanged, switchMap, takeUntil, tap} from 'rxjs/operators';
import {cdkAnimations} from '@cdk/animations';
import {CdkSidebarService} from '@cdk/components/sidebar/sidebar.service';
import {ConfigModulo, Modulo} from '../../../models';
import {ConfigModuloDataSource} from '../../../data-sources/config-modulo-data-source';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../../app/main/apps/admin/config-modulo/config-modulo-list/store';

@Component({
    selector: 'cdk-config-modulo-grid',
    templateUrl: './cdk-config-modulo-grid.component.html',
    styleUrls: ['./cdk-config-modulo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkConfigModuloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    configModules: ConfigModulo[];

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
        'dataType',
        'dataSchema',
        'dataValue',
        'module',
        'mandatory',
        'actions'
    ];

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
    editAdmin = new EventEmitter<number>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<ConfigModulo>();

    @Output()
    selectedIds: number[] = [];

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
            id: 'dataType',
            label: 'Data Type',
            fixed: false
        },
        {
            id: 'dataSchema',
            label: 'Data Schema',
            fixed: false
        },
        {
            id: 'dataValue',
            label: 'Data Value',
            fixed: false
        },
        {
            id: 'modulo',
            label: 'Módulo',
            fixed: false
        },
        {
            id: 'mandatory',
            label: 'Mandatory',
            fixed: false
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false
        },
        {
            id: 'apagadoPor.nome',
            label: 'Deletado Por',
            fixed: false
        },
        {
            id: 'actions',
            label: '',
            fixed: true
        }
    ];

    columns = new FormControl();
    dataSource: ConfigModuloDataSource;

    gridFilter: any;
    showFilter = false;
    hasSelected = false;
    isIndeterminate = false;
    hasExcluded = false;
    moduloControl: FormControl = new FormControl();

    pagination$: Observable<any>;
    pagination: any;

    /**
     * @param _changeDetectorRef
     * @param _cdkSidebarService
     * @param _store
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkSidebarService: CdkSidebarService,
        private _store: Store<fromStore.ConfigModuleListAppState>
    ) {
        this.gridFilter = {};
        this.configModules = [];
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
    }

    ngOnChanges(): void {
        this.dataSource = new ConfigModuloDataSource(of(this.configModules));
        this.paginator.length = this.total;
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.pagination = pagination;
            this.gridFilter.filters = this.pagination.filter;
        });

        const elementQueries = require('css-element-queries/src/ElementQueries');
        elementQueries.listen();
        elementQueries.init();
        this.paginator.pageSize = this.pageSize;
        this.dataSource = new ConfigModuloDataSource(of(this.configModules));
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

        this.moduloControl.valueChanges.pipe().subscribe((modulo) => {
            delete this.gridFilter.filters;
            if (modulo.length > 0) {
                this.gridFilter = {
                    filters: {
                        "modulo.id": `in:${modulo.toString()}`
                    }
                };
            }

            this.loadPage();
        });
    }

    ngAfterViewInit(): void {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(
            this.sort.sortChange,
            this.paginator.page
        ).pipe(
            tap(() => this.loadPage())
        ).subscribe();
    }

    toggleFilter(): void {
        this._cdkSidebarService.getSidebar('cdk-config-modulo-filter').toggleOpen();
        this.showFilter = !this.showFilter;
    }

    loadPage(): void {
        const filter = this.gridFilter.filters;
        delete this.gridFilter.filters;
        const contexto = this.gridFilter.contexto ?? {};
        delete this.gridFilter.contexto;
        contexto['mostrarApagadas'] = this.hasExcluded;
        this.reload.emit({
            filter: filter,
            gridFilter: this.gridFilter,
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

    editConfigModule(configModuleId): void {
        this.edit.emit(configModuleId);
    }

    editAdminConfigModule(configModuleId): void {
        this.editAdmin.emit(configModuleId);
    }

    selectConfigModule(configModule: ConfigModulo): void {
        this.selected.emit(configModule);
    }

    deleteConfigModule(configModuleId): void {
        this.delete.emit(configModuleId);
    }

    deleteConfigModules(configModulesId): void {
        configModulesId.forEach(configModule => this.deleteConfigModule(configModule));
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
        const arr = Object.keys(this.configModules).map(k => this.configModules[k]);
        this.selectedIds = arr.map(configModule => configModule.id);
        this.recompute();
    }

    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(configModuleId): void {
        const selectedConfigModulesIds = [...this.selectedIds];

        if (selectedConfigModulesIds.find(id => id === configModuleId) !== undefined) {
            this.selectedIds = selectedConfigModulesIds.filter(id => id !== configModuleId);
        } else {
            this.selectedIds = [...selectedConfigModulesIds, configModuleId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.configModules.length && this.selectedIds.length > 0);
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
