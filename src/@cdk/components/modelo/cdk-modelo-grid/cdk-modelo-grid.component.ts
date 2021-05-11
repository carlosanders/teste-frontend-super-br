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

import {Documento, Modelo} from '@cdk/models';
import {ModeloDataSource} from '@cdk/data-sources/modelo-data-source';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'cdk-modelo-grid',
    templateUrl: './cdk-modelo-grid.component.html',
    styleUrls: ['./cdk-modelo-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkModeloGridComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading = false;

    @Input()
    modelos: Modelo[];

    @Input()
    total = 0;

    @Input()
    saving = false;

    @Input()
    mode = 'list';

    @Input()
    documento = false;

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'modalidadeModelo.valor', 'ativo', 'highlights', 'actions'];

    allColumns: any[] = [
        {
            id: 'select',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'id',
            label: 'Id',
            fixed: true,
            mode: 'all',
            sort: 'all'
        },
        {
            id: 'nome',
            label: 'nome',
            fixed: true,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'highlights',
            label: 'Resumo',
            fixed: false,
            mode: 'search',
            sort: 'none'
        },
        {
            id: 'ativo',
            label: 'Ativo',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'descricao',
            label: 'Descrição',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'modalidadeModelo.valor',
            label: 'Modalidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'template.nome',
            label: 'Template',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelos.setor.nome',
            label: 'Setor',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelos.unidade.nome',
            label: 'Unidade',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'vinculacoesModelo.modalidadeOrgaoCentral.valor',
            label: 'Órgão Central',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'documento.tipoDocumento.nome',
            label: 'Documento',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoPor.nome',
            label: 'Criado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'criadoEm',
            label: 'Criado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoPor.nome',
            label: 'Atualizado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'atualizadoEm',
            label: 'Atualizado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoPor.nome',
            label: 'Apagado Por',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'apagadoEm',
            label: 'Apagado Em',
            fixed: false,
            mode: 'all',
            sort: 'list'
        },
        {
            id: 'actions',
            label: '',
            fixed: true,
            mode: 'all',
            sort: 'all'
        }
    ];

    columns = new FormControl();

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: {};

    @Input()
    pageSize = 10;

    @Input()
    actions: string[] = ['edit', 'editConteudo', 'especie', 'delete', 'select'];

    @Input()
    checkboxSelection = true;

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
    especie = new EventEmitter<number>();

    @Output()
    editConteudo = new EventEmitter<Documento>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    selected = new EventEmitter<Modelo>();

    @Output()
    view = new EventEmitter<number>();

    @Output()
    selectedIds: number[] = [];

    dataSource: ModeloDataSource;

    showFilter = false;

    gridFilter: any;

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
        this.modelos = [];
    }

    ngOnChanges(): void {
        this.dataSource = new ModeloDataSource(of(this.modelos));
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

        this.dataSource = new ModeloDataSource(of(this.modelos));

        this.columns.setValue(this.getAllColumns().map(c => c.id).filter(c => this.displayedColumns.indexOf(c) > -1));

        this.columns.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((values) => {
                this.displayedColumns = [];
                this.getAllColumns().forEach(c => {
                    if (c.fixed || (values.indexOf(c.id) > -1)) {
                        this.displayedColumns.push(c.id);
                    }
                });
                this._changeDetectorRef.markForCheck();
                return of([]);
            })
        ).subscribe();
    }

    getSort(columnId: string): boolean {
        let disabled = true;
        this.getAllColumns().forEach(c => {
            if (c.id === columnId && (c.sort === 'all' || c.sort === this.mode)) {
                disabled = false;
            }
        });
        return disabled;
    }

    getAllColumns(): any[] {
        return this.allColumns.filter(
            c => c.mode === 'all' || c.mode === this.mode
        );
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
        this._cdkSidebarService.getSidebar('cdk-modelo-filter').toggleOpen();
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
        this.hasExcluded = false;
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

    editModelo(modeloId): void {
        this.edit.emit(modeloId);
    }

    especieSetores(modeloId): void {
        this.especie.emit(modeloId);
    }

    editConteudoModelo(documento: Documento): void {
        this.editConteudo.emit(documento);
    }

    selectModelo(modelo: Modelo): void {
        this.loading = true;
        this.selected.emit(modelo);
    }

    visualizarModelo(modeloId: number): void {
        this.view.emit(modeloId);
    }

    deleteModelo(modeloId): void {
        this.delete.emit(modeloId);
    }

    deleteModelos(modelosId): void {
        modelosId.forEach(modeloId => this.deleteModelo(modeloId));
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
        const arr = Object.keys(this.modelos).map(k => this.modelos[k]);
        this.selectedIds = arr.map(modelo => modelo.id);
        this.recompute();
    }

    /**
     * Deselect all tarefas
     */
    deselectAll(): void {
        this.selectedIds = [];
        this.recompute();
    }

    toggleInSelected(modeloId): void {
        const selectedModeloIds = [...this.selectedIds];

        if (selectedModeloIds.find(id => id === modeloId) !== undefined) {
            this.selectedIds = selectedModeloIds.filter(id => id !== modeloId);
        } else {
            this.selectedIds = [...selectedModeloIds, modeloId];
        }
        this.recompute();
    }

    recompute(): void {
        this.hasSelected = this.selectedIds.length > 0;
        this.isIndeterminate = (this.selectedIds.length !== this.modelos.length && this.selectedIds.length > 0);
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

    getProp(obj, prop) {
        if (obj && obj.hasOwnProperty(prop)) {
            return obj[prop];
        }
        return false;
    }
}
